import {Switch} from 'antd';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {$theme, updateThemeEvent} from '../../store/models/theme';
import {useStore} from 'effector-react';
import {ETheme} from '../../store/models/theme/types';
import {Styled} from './ThemeSwitcher-styled';
import React from 'react';
import { CommonStyled } from '../common/components-styled';


interface IThemeSwitcher {
    children: React.ReactNode;
}

export const ThemeSwitcher: React.FC<IThemeSwitcher> = ({children}) => {

    const theme = useStore($theme);

    const switchTheme = () => {
        updateThemeEvent(theme === ETheme.Dark ? ETheme.Light : ETheme.Dark)
    }

    return (
        <>
            <Styled.Wrapper>
                <Styled.Text>
                    Темный режим
                </Styled.Text>
                <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={theme === ETheme.Dark}
                    onChange={switchTheme}
                />
            </Styled.Wrapper>
            {children}
        </>
    )
}
