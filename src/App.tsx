import React, {memo, useEffect} from 'react';
import './store/init';
import 'antd/dist/antd.variable.min.css';
import {RootNavigator} from './components/RootNavigator/RootNavigator';
import {$isTokenChecked, validateTokenEvent} from './store/models/auth';
import {useStore} from 'effector-react';
import {Loader} from './components/Loader/Loader';
import {Styled} from './App-styled';
import {ConfigProvider} from 'antd';
import {Colors} from './theme/colors';
import {ThemeProvider} from 'styled-components';
import {useStyledComponentsTheme} from './hooks/useStyledComponentsTheme';
import {$theme} from './store/models/theme';
import {serviceConnectEvent} from './store/models/events';
import {CryptoManager} from './crypto/CryptoManager';


const generateKeys = async () => {

    const text = 'фыврилрилили лиолиолилидоиод лоибои';

    const crypto = new CryptoManager();
    const keys1 = await crypto.generateKeyPair();
    const keys2 = await crypto.generateKeyPair();

    const derivedKey = await crypto.generateDeriveKey(keys2.publicKeyJwk, keys1.privateKeyJwk);

    const encryptedText = await crypto.encryptText(text, derivedKey);

    //await generateKeys2(keys2, keys1.publicKeyJwk, encryptedText);

    /*console.group('User-1 keys')
        console.log('JWK keys', keys1);
        console.log('Derive key', derivedKey);
        console.log('encryptedText', encryptedText);
    console.groupEnd()*/
}

/*const generateKeys2 = async (keys2: {publicKeyJwk: JsonWebKey, privateKeyJwk: JsonWebKey}, pubKey1: JsonWebKey, encryptedText: string) => {

    const crypto = new CryptoManager();

    const derivedKey = await crypto.generateDeriveKey(pubKey1, keys2.privateKeyJwk);

    const decryptedText = await crypto.decryptText(encryptedText, derivedKey);


    /!*console.group('User-2 keys')
    console.log('JWK keys', keys2);
    console.log('Derive key', derivedKey);
    console.log('encryptedText', encryptedText);
    console.log('decryptedText', decryptedText);
    console.groupEnd()*!/
}*/

generateKeys();


const App = memo(() => {

    const isTokenChecked = useStore($isTokenChecked);
    const theme = useStore($theme);

    const styledComponentsTheme = useStyledComponentsTheme(theme);

    ConfigProvider.config({
        theme: {
            primaryColor: Colors.primary,
            infoColor: 'white'
        },
    })

    useEffect(() => {
        if (!isTokenChecked) {
            validateTokenEvent();
        }
    }, [isTokenChecked])

    useEffect(() => {
        serviceConnectEvent()
    }, [])

    if (!isTokenChecked) {
        return (
            <Loader/>
        )
    }

    return (
        <ThemeProvider theme={styledComponentsTheme}>
            <ConfigProvider>
                <Styled.AppWrapper>
                    <RootNavigator/>
                </Styled.AppWrapper>
            </ConfigProvider>
        </ThemeProvider>
    );
})

export default App;
