const shiftRows = (matrixGroups) => {

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

const shiftRowsReverse = (matrixGroups) => {

    return matrixGroups.map((matrix) => {

        const matrixLength = matrix.length;

        return matrix.map((row, colIndex) => {

            return row.map((num, rowIndex) => {

                const currentColIndex =
                    (colIndex + (matrixLength - rowIndex) > matrixLength - 1)
                        ? Math.abs(matrixLength - (colIndex + (matrixLength - rowIndex)))
                        : colIndex + (matrixLength - rowIndex);


                return matrix[currentColIndex][rowIndex];
            })
        })
    })
}

const mixColumns = (matrixGroups) => {
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

const matrix = [[
    [123, 12, 42, 234],
    [56, 33, 121, 111],
    [22, 55, 23, 210],
    [0, 50, 88, 17],
]]



/*
const resShiftRows = shiftRows([
    [
        [123, 12, 42, 234],
        [56, 33, 121, 111],
        [22, 55, 23, 210],
        [0, 50, 88, 17],
    ]
])

const resShiftRowsReverse = shiftRowsReverse(resShiftRows)

console.log('Shift Rows', resShiftRows)
console.log('Shift Rows Reverse', resShiftRowsReverse)*/

/*[123, 33, 23, 17],
[56, 55, 88, 234],
[22, 50, 42, 111],
[0, 12, 121, 210],*/

