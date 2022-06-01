export class CryptoManagerUtils {

    static textListToMatrix(textList: number[]) {
        let fullListLength = textList.length;

        while (fullListLength % 16 !== 0) {
            fullListLength++;
        }

        return CryptoManagerUtils.listToMatrix(textList, 4, fullListLength);
    }

    static listToMatrix(list: number[], groupLength: number, fullListLength?: number) {

        let matrix = [];

        for (let i = 0, k = -1; i < (fullListLength ?? list.length); i++) {
            if (i % groupLength === 0) {
                k++;
                matrix[k] = [];
            }

            // @ts-ignore
            matrix[k].push(list.length > i ? list[i] : 0);
        }

        return matrix;
    }

    static makeMatrixGroups(matrix: number[][]): number[][][] {
        let matrixGroups = [];

        for (let i = 0, k = -1; i < matrix.length; i++) {
            if (i % 4 === 0) {
                k++;
                matrixGroups[k] = [];
            }

            // @ts-ignore
            matrixGroups[k].push(matrix.length > i ? matrix[i] : 0);
        }

        return matrixGroups;
    }

    static matrixToList(matrix: number[][]): number[] {
        // @ts-ignore
        return [].concat(...matrix);
    }

    static generateSBoxes(): number[][][] {

        const irreduciblePoly = '1 + x + x**3 + x**4 + x**8';
        const p = parseInt(eval(irreduciblePoly.replace(/x/g, '10')), 2);


        let t = new Uint32Array(256);
        for (let i = 0, x = 1; i < 256; i ++) {
            t[i] = x;
            x ^= (x << 1) ^ ((x >>> 7) * p);
        }

        let Sbox = new Uint32Array(256);
        Sbox[0] = 0x63;
        for (let i = 0; i < 255; i ++) {
            let x = t[255 - i];
            x |= x << 8;
            x ^= (x >> 4) ^ (x >> 5) ^ (x >> 6) ^ (x >> 7);
            Sbox[t[i]] = (x ^ 0x63) & 0xFF;
        }

        const SboxResReverse = CryptoManagerUtils.generateSBoxInverse(Sbox);

        const SboxRes = CryptoManagerUtils.listToMatrix(
            CryptoManagerUtils.matrixToList(Array.from(Sbox) as any), 16
        );

        return [SboxRes, SboxResReverse];
    }

    static generateSBoxInverse(sbox: Uint32Array): number[][] {
       let InvSbox = new Uint32Array(256);
        for (let i =0; i < 256; i++){
            InvSbox[i] = sbox.indexOf(i);
        }
        return CryptoManagerUtils.listToMatrix(
            CryptoManagerUtils.matrixToList(Array.from(InvSbox) as any), 16
        );
    }

    static xorMatrices(matrixGroups: number[][][], matrixForXor: number[][]): number[][][] {
        return matrixGroups.map(matrix => {
            return matrix.map((col, colIdx) => {
                return col.map((num, numIdx) => {
                    return num ^ matrixForXor[colIdx][numIdx]
                })
            })
        })
    }

    static subBytesForNum(num: number, table: number[][]): number {
        const numHex = num.toString(16).split('');
        if (numHex.length < 2) {
            numHex.unshift('0')
        }
        const [firstHexNum, secondHexNum] = numHex;
        return table[parseInt(firstHexNum, 16)][parseInt(secondHexNum, 16)]
    }

    static subBytes(matrixGroups: number[][][], table: number[][]): number[][][] {
        return matrixGroups.map(matrix => {
            return matrix.map((row) => {
                return row.map((num) => {
                    return CryptoManagerUtils.subBytesForNum(num, table);
                })
            })
        })
    }

    static shiftRows(matrixGroups: number[][][]): number[][][] {
        return matrixGroups.map((matrix) => {

            const matrixLength = matrix.length;

            return matrix.map((row, colIndex) => {
                return row.map((num, rowIndex) => {
                    const indexSum = colIndex + rowIndex;
                    const currentColIndex =
                        (indexSum > matrixLength - 1)
                            ? Math.abs(matrixLength - indexSum)
                            : indexSum;
                    return matrix[currentColIndex][rowIndex];
                })
            })
        })
    }

    static shiftRowsReverse(matrixGroups: number[][][]): number[][][] {
        return matrixGroups.map((matrix) => {

            const matrixLength = matrix.length;

            return matrix.map((row, colIndex) => {
                return row.map((num, rowIndex) => {
                    const indexSum = colIndex + (matrixLength - rowIndex);
                    const currentColIndex =
                        (indexSum > matrixLength - 1)
                            ? Math.abs(matrixLength - indexSum)
                            : indexSum;
                    return matrix[currentColIndex][rowIndex];
                })
            })
        })
    }

    static mixColumns(matrixGroups: number[][][]): number[][][] {
        return matrixGroups.map(matrix => {
            return matrix.map((row, colIndex) => {
                if (colIndex % 2 === 1) {
                    return row;
                }
                return row.map((num, rowIndex) => {
                    return num ^ matrix[colIndex+1][rowIndex];
                })
            })
        })
    }

    static keySchedule(key: number[][], table: number[][]): number[][][] {

        const getRoundKey = (currKey: number[][]): number[][] => {

            let roundKey: number[][] = [];

            const lastCol = currKey[currKey.length - 1];

            const shiftedLastCol = lastCol.map((num, idx) => {
                return lastCol[(idx - 1 < 0) ? lastCol.length - 1 - idx : idx - 1]
            })

            const lastColWithSubBytes = shiftedLastCol.map(num => {
                return CryptoManagerUtils.subBytesForNum(num, table);
            })

            const newFirstCol = lastColWithSubBytes.map((num, idx) => {
                return num ^ key[0][idx];
            })

            roundKey.push(newFirstCol);

            key.forEach((col, colIdx) => {
                if (colIdx > 0) {
                    roundKey.push(col.map((num, idx) => {
                        return num ^ roundKey[colIdx-1][idx]
                    }))
                }
            })

            return roundKey;
        }

        const roundKeys: number[][][] = [];

        for (let i = 0; i < 10; i++) {
            let currKey = i > 0 ? roundKeys[i-1] : key;
            roundKeys.push(getRoundKey(currKey));
        }

        return roundKeys;

    }

}
