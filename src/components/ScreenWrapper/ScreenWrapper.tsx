import { Styled } from "./ScreenWrapper-styled"
import React, {FC, memo, ReactNode} from 'react';
import {DialogsBar} from '../DialogsBar/DialogsBar';

interface IScreenWrapper {
    children: ReactNode
}

export const ScreenWrapper: FC<IScreenWrapper> = memo(({children}) => {

    return (
        <Styled.Wrapper>
            <div>
                <DialogsBar/>
            </div>
            <Styled.Content>
                {children}
            </Styled.Content>
        </Styled.Wrapper>
    )

})
