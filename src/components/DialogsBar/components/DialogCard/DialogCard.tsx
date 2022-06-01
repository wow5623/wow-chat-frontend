import React, {useEffect} from 'react';
import {Styled} from './DialogCard-styled';
import {Button} from 'antd';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {useIsManyUnreadMessages} from './hooks/useIsManyUnreadMessages';
import {useIsDialogAcceptPending} from './hooks/useIsDialogAcceptPending';
import {acceptDialogEvent, deleteDialogEvent, deleteDialogFx} from '../../../../store/models/dialogs';
import {TMessage} from '../../../../store/models/messages/types';
import {useStore} from 'effector-react';
import {useNavigate} from 'react-router-dom';
import {useMessageSendTime} from '../../../../hooks/useMessageSendTime';

interface IDialogCard {
    dialogId: string;
    partnerId: string | undefined;
    countUnreadMessages?: number;
    partnerName: string | undefined;
    lastMessage: TMessage;
    isDialogAccepted: boolean;
    isDialogRequest: boolean;
    dialogCreatedTime: string;
}

export const DialogCard: React.FC<IDialogCard> = React.memo(
    ({dialogId, partnerId, isDialogRequest, isDialogAccepted, countUnreadMessages, partnerName, lastMessage, dialogCreatedTime}
    ) => {

    const navigate = useNavigate();

    const sendTime = useMessageSendTime(lastMessage?.createdTime ?? dialogCreatedTime);

    const isManyUnreadMessages = useIsManyUnreadMessages(countUnreadMessages);
    const isDialogAcceptPending = useIsDialogAcceptPending(partnerId ?? '');

    const deleteDialogPending = useStore(deleteDialogFx.pending);

    const acceptDialog = () => {
        acceptDialogEvent({
            dialogId,
            initiatorId: partnerId ?? '',
        })
    }

    const deleteDialog = () => {
        deleteDialogEvent(dialogId);
    }

    if (!isDialogAccepted && !isDialogRequest) {
        return null;
    }

    const handleDialogNavigate = () => {
        if (isDialogAccepted) {
            navigate(`/dialog/${dialogId}`);
        }
    }

    return (
        <Styled.Wrapper isDialogAccepted={isDialogAccepted} onClick={handleDialogNavigate}>
            <Styled.UserAvatarWrapper>
                <Styled.UserAvatar size={60} isDialogAccepted={isDialogAccepted}>
                    {partnerName?.at(0)}
                </Styled.UserAvatar>
            </Styled.UserAvatarWrapper>
            <Styled.Info>
                <Styled.InfoSectionTop>
                    <Styled.UserName>
                        {partnerName}
                    </Styled.UserName>
                    <Styled.AdditionalInfo>
                        {
                            isDialogAccepted && !!countUnreadMessages && countUnreadMessages !== 0 && (
                                <Styled.UnreadMessagesBadge count={countUnreadMessages} isManyUnreadMessages={isManyUnreadMessages}/>
                            )
                        }
                        <Styled.SendTime>
                            {sendTime}
                        </Styled.SendTime>
                    </Styled.AdditionalInfo>
                </Styled.InfoSectionTop>
                {
                    isDialogAccepted && (
                        <Styled.LastMessage>
                            {
                                lastMessage?.text || 'Нет сообщений'
                            }
                        </Styled.LastMessage>
                    )
                }
                {
                    isDialogRequest && (
                        <Styled.DialogAcceptMessage>
                            <span>
                                Хочет с Вами пообщаться
                            </span>
                            <Button
                                icon={<CheckOutlined />}
                                type={'primary'}
                                shape={'circle'}
                                size={'small'}
                                loading={isDialogAcceptPending}
                                onClick={acceptDialog}
                            />
                            <Button
                                icon={<CloseOutlined />}
                                type={'primary'}
                                shape={'circle'}
                                size={'small'}
                                loading={deleteDialogPending}
                                onClick={deleteDialog}
                                danger
                            />
                        </Styled.DialogAcceptMessage>
                    )
                }
            </Styled.Info>
        </Styled.Wrapper>
    )
})
