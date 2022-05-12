import React from 'react';
import {Styled} from './DialogCard-styled';
import {Button} from 'antd';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {useIsManyUnreadMessages} from './hooks/useIsManyUnreadMessages';
import {useIsDialogAcceptPending} from './hooks/useIsDialogAcceptPending';
import {acceptDialogEvent} from '../../../../store/models/dialogs';

interface IDialogCard {
    dialogId: string;
    partnerId: string | undefined;
    countUnreadMessages?: number;
    partnerName: string | undefined;
    isDialogAccepted: boolean;
    isDialogRequest: boolean;
}

export const DialogCard: React.FC<IDialogCard> = React.memo(
    ({dialogId, partnerId, isDialogRequest, isDialogAccepted, countUnreadMessages, partnerName}
    ) => {

    const isManyUnreadMessages = useIsManyUnreadMessages(countUnreadMessages);
    const isDialogAcceptPending = useIsDialogAcceptPending(partnerId ?? '');

    const acceptDialog = () => {
        acceptDialogEvent({
            dialogId,
            initiatorId: partnerId ?? '',
        })
    }

    if (!isDialogAccepted && !isDialogRequest) {
        return null;
    }

    return (
        <Styled.Wrapper isDialogAccepted={isDialogAccepted}>
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
                            14:40
                        </Styled.SendTime>
                    </Styled.AdditionalInfo>
                </Styled.InfoSectionTop>
                {
                    isDialogAccepted && (
                        <Styled.LastMessage>
                            Приве вдфь sad вждфыв фыв ьждфы ьвжфы ьвжфыь вждьфыжвь фжыь вжьфыв ждьыфж
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
                                danger
                            />
                        </Styled.DialogAcceptMessage>
                    )
                }
            </Styled.Info>
        </Styled.Wrapper>
    )
})
