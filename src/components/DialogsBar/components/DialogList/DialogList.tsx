import React from 'react';
import {Styled} from './DialogList-styled';
import {TMyDialog} from '../../../../store/models/dialogs/types';
import {DialogCard} from '../DialogCard/DialogCard';

interface IDialogList {
    dialogs: TMyDialog[] | null
}

export const DialogList: React.FC<IDialogList> = React.memo(({dialogs}) => {

    if (!dialogs || dialogs.length === 0) {
        return (
            <Styled.Wrapper>
                <Styled.NotFoundMessage>
                    Диалоги не найдены <span className={'emoji'}>🙀</span>
                </Styled.NotFoundMessage>
            </Styled.Wrapper>
        )
    }

    return (
        <Styled.Wrapper>
            {
                dialogs.map((dialog) => {
                    return (
                        <DialogCard
                            key={dialog.id}
                            dialogId={dialog.id}
                            partnerId={dialog.partner?.id}
                            partnerName={dialog.partner?.name}
                            isDialogAccepted={dialog.isDialogAccepted}
                            isDialogRequest={dialog.isDialogRequest}
                        />
                    )
                })
            }
        </Styled.Wrapper>
    )

})
