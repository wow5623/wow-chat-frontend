import {CryptoManagerUtils} from './CryptoManagerUtils';
import {TKeyPair} from './types';

export class CryptoManager {

    async generateKeyPair(): Promise<TKeyPair> {

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

    async generateDeriveKey(publicKeyJwk: JsonWebKey, privateKeyJwk: JsonWebKey): Promise<CryptoKey> {
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

        return await window.crypto.subtle.deriveKey(
            {name: 'ECDH', public: publicKey},
            privateKey,
            {name: 'AES-GCM', length: 128},
            true,
            ['encrypt', 'decrypt']
        );

    }


    async encryptText(text: string, derivedKey: CryptoKey): Promise<string> {

        const encodedText = new TextEncoder().encode(text);

        const deriveKeyBuffer = await window.crypto.subtle.exportKey(
            'raw',
            derivedKey
        );

        const [table] = CryptoManagerUtils.generateSBoxes();
        const encodedDeriveKey = new Uint8Array(deriveKeyBuffer);
        const encodedTextMatrix = CryptoManagerUtils.textListToMatrix(Array.from(encodedText));
        const encodedDeriveKeyMatrix = CryptoManagerUtils.listToMatrix(Array.from(encodedDeriveKey), 4);
        const encodedTextMatrixGroups = CryptoManagerUtils.makeMatrixGroups(encodedTextMatrix);
        const roundsKeys = CryptoManagerUtils.keySchedule(encodedDeriveKeyMatrix, table);

        let finalEncodedTextMatrixGroups: number[][][] = CryptoManagerUtils.xorMatrices(encodedTextMatrixGroups, encodedDeriveKeyMatrix);

        for (let i = 0; i < 10; i++) {
            const textAfterSubBytes = CryptoManagerUtils.subBytes(finalEncodedTextMatrixGroups, table);
            const textAfterShiftRows = CryptoManagerUtils.shiftRows(textAfterSubBytes);
            const textAfterMixColumns = CryptoManagerUtils.mixColumns(textAfterShiftRows);
            finalEncodedTextMatrixGroups = CryptoManagerUtils.xorMatrices(textAfterMixColumns, roundsKeys[i]);
        }

        const uintArray = new Uint8Array([].concat(...finalEncodedTextMatrixGroups.map(matrix => [].concat(...matrix as any))));

        const finalText = btoa(String.fromCharCode.apply(null, Array.from(uintArray)));


        return finalText;
    }

    async decryptText(text: string, derivedKey: CryptoKey): Promise<string> {
        try {

            const textBuffer = new Uint8Array(atob(text).split("").map((c) => {
                return c.charCodeAt(0); }
            ));

            const deriveKeyBuffer = await window.crypto.subtle.exportKey(
                'raw',
                derivedKey
            );

            const [table, tableReverse] = CryptoManagerUtils.generateSBoxes();
            const decodedDeriveKey = new Uint8Array(deriveKeyBuffer);

            const decodedTextMatrix = CryptoManagerUtils.textListToMatrix(Array.from(textBuffer));
            const decodedDeriveKeyMatrix = CryptoManagerUtils.listToMatrix(Array.from(decodedDeriveKey), 4);
            const decodedTextMatrixGroups = CryptoManagerUtils.makeMatrixGroups(decodedTextMatrix);

            const roundsKeys = CryptoManagerUtils.keySchedule(decodedDeriveKeyMatrix, table);

            let finalDecodedTextMatrixGroups: number[][][] = decodedTextMatrixGroups;

            for (let i = 9; i >= 0; i--) {
                const textAfterXorRoundKeys = CryptoManagerUtils.xorMatrices(finalDecodedTextMatrixGroups, roundsKeys[i]);
                const textAfterMixColumns = CryptoManagerUtils.mixColumns(textAfterXorRoundKeys);
                const textAfterShiftRows = CryptoManagerUtils.shiftRowsReverse(textAfterMixColumns);
                finalDecodedTextMatrixGroups = CryptoManagerUtils.subBytes(textAfterShiftRows, tableReverse);
            }

            finalDecodedTextMatrixGroups = CryptoManagerUtils.xorMatrices(finalDecodedTextMatrixGroups, decodedDeriveKeyMatrix);

            const uintArray = new Uint8Array([].concat(...finalDecodedTextMatrixGroups.map(matrix => [].concat(...matrix as any))));

            return new TextDecoder().decode(uintArray);
        } catch (e) {
            return `error decrypting message: ${e}`;
        }
    }
}
