import React from 'react';
import {Styled} from './DialogList-styled';
import {TMyDialog} from '../../../../store/models/dialogs/types';
import {DialogCard} from '../DialogCard/DialogCard';
import {useStore} from 'effector-react';
import {getAllMeDialogsFx} from '../../../../store/models/dialogs';
import {Spin} from 'antd';

interface IDialogList {
    dialogs: TMyDialog[] | null
}

export const DialogList: React.FC<IDialogList> = React.memo(({dialogs}) => {

    const dialogsPending = useStore(getAllMeDialogsFx.pending);

    if (dialogsPending) {
        return (
            <Styled.Wrapper>
                <Styled.LoaderWrapper>
                    <Spin size={'large'}/>
                </Styled.LoaderWrapper>
            </Styled.Wrapper>
        )
    }

    if (!dialogs || dialogs?.length === 0) {
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
                dialogs?.map((dialog) => {
                    return (
                        <DialogCard
                            key={dialog.id}
                            dialogId={dialog.id}
                            partnerId={dialog.partner?.id}
                            partnerName={dialog.partner?.name}
                            lastMessage={dialog.lastMessage}
                            isDialogAccepted={dialog.isDialogAccepted}
                            isDialogRequest={dialog.isDialogRequest}
                            dialogCreatedTime={dialog.createdTime}
                        />
                    )
                })
            }
        </Styled.Wrapper>
    )

})
