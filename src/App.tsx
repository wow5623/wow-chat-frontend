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
import {ThemeSwitcher} from './components/ThemeSwitcher/ThemeSwitcher';

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

    if (!isTokenChecked) {
        return (
            <Loader/>
        )
    }

    return (
        <ThemeProvider theme={styledComponentsTheme}>
            <ConfigProvider>
                <Styled.AppWrapper>
                    <ThemeSwitcher>
                        <RootNavigator/>
                    </ThemeSwitcher>
                </Styled.AppWrapper>
            </ConfigProvider>
        </ThemeProvider>
    );
})

export default App;
