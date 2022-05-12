export class CryptoManager {

    async generateKeyPair(): Promise<{ publicKeyJwk: JsonWebKey, privateKeyJwk: JsonWebKey }> {

        const keyPair = await window.crypto.subtle.generateKey(
            {
                name: 'ECDH',
                namedCurve: 'P-256',
            },
            true,
            ['deriveKey', 'deriveBits']
        );

        const publicKeyJwk = await window.crypto.subtle.exportKey(
            'jwk',
            keyPair.publicKey
        );

        const privateKeyJwk = await window.crypto.subtle.exportKey(
            'jwk',
            keyPair.privateKey
        );

        return {publicKeyJwk, privateKeyJwk};
    };

    async generateDeriveKey(publicKeyJwk: JsonWebKey, privateKeyJwk: JsonWebKey): Promise<ArrayBuffer> {
        const publicKey = await window.crypto.subtle.importKey(
            'jwk',
            publicKeyJwk,
            {
                name: 'ECDH',
                namedCurve: 'P-256',
            },
            true,
            []
        );

        const privateKey = await window.crypto.subtle.importKey(
            'jwk',
            privateKeyJwk,
            {
                name: 'ECDH',
                namedCurve: 'P-256',
            },
            true,
            ['deriveKey', 'deriveBits']
        );

        const key = await window.crypto.subtle.deriveKey(
            {name: 'ECDH', public: publicKey},
            privateKey,
            {name: 'AES-GCM', length: 128},
            true,
            ['encrypt', 'decrypt']
        );

        const keyExported = await window.crypto.subtle.exportKey(
            'raw',
            key
        )

        console.log('DERIVE KEY [jwk]', key);
        console.log('DERIVE KEY [buffer]', keyExported);
        console.log('DERIVE KEY [unit8]', new Uint8Array(keyExported));

        return keyExported;
    }

    private listToMatrix(list: number[]) {
        let matrix = [];

        let fullListLength = list.length;

        while (fullListLength % 16 !== 0) {
            fullListLength++;
        }

        for (let i = 0, k = -1; i < fullListLength; i++) {
            if (i % 4 === 0) {
                k++;
                matrix[k] = [];
            }

            // @ts-ignore
            matrix[k].push(list.length > i ? list[i] : 0);
        }

        return matrix;
    }

    private matrixSeperate(list: number[][]) {
        let matrix = [];

        for (let i = 0, k = -1; i < list.length; i++) {
            if (i % 4 === 0) {
                k++;
                matrix[k] = [];
            }

            // @ts-ignore
            matrix[k].push(list.length > i ? list[i] : 0);
        }

        return matrix;
    }

    async encryptText(text: string, derivedKey: ArrayBuffer): Promise<string> {


        const encodedText = new TextEncoder().encode(text);
        const encodedDeriveKey = new Uint8Array(derivedKey);

        const encodedTextMatrix = this.listToMatrix(Array.from(encodedText));
        const encodedDeriveKeyMatrix = this.listToMatrix(Array.from(encodedDeriveKey));

        console.log('TEXT MATRIX', encodedTextMatrix);
        console.log('DKEY MATRIX', encodedDeriveKeyMatrix);

        const encodedTextMatrixes = this.matrixSeperate(encodedTextMatrix);

        console.log(encodedTextMatrixes);


        const mixedMatrixes: number[][][] = encodedTextMatrixes.map(matrix => {
            return matrix.map((col, colIdx) => {
                // @ts-ignore
                return col.map((num, numIdx) => {
                    return num ^ encodedDeriveKeyMatrix[colIdx][numIdx]
                })
            })
        })

        console.log('MIXED MATRIXES', mixedMatrixes);


        /*const encryptedData = await window.crypto.subtle.encrypt(
            {name: 'AES-GCM', iv: new TextEncoder().encode('Initialization Vector')},
            derivedKey,
            encodedText
        );*/

        /*const uintArray = new Uint8Array(encryptedData);


        const string = String.fromCharCode.apply(null, uintArray as unknown as number[]);


        const result = btoa(string);*/



        return text;
    }

    async decryptText(text: string, derivedKey: CryptoKey) {
        try {
           /* const message = JSON.parse(messageJSON);
            const text = message.base64Data;
            const initializationVector = new Uint8Array(message.initializationVector).buffer;*/

            const string = atob(text);
            const uintArray = new Uint8Array(
                [...string.split('')].map((char) => char.charCodeAt(0))
            );
            const algorithm = {
                name: 'AES-GCM',
                iv: new TextEncoder().encode("Initialization Vector"),
            };
            const decryptedData = await window.crypto.subtle.decrypt(
                algorithm,
                derivedKey,
                uintArray
            );

            return new TextDecoder().decode(decryptedData);
        } catch (e) {
            return `error decrypting message: ${e}`;
        }
    }
}
