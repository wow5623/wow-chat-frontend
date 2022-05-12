import {Styled} from './UserItem-styled';
import {Avatar, Button} from 'antd';
import React from 'react';
import {ArrowRightOutlined, PlusOutlined} from '@ant-design/icons';
import {createDialogEvent} from '../../../../store/models/dialogs';
import {useIsDialogCreatePending} from './hooks/useIsDialogCreatePending';

interface IUserItem {
    isDialogAccepted: boolean;
    isDialogCreated: boolean;
    userName: string;
    userEmail: string;
    userId: string;
}

export const UserItem: React.FC<IUserItem> = React.memo(({userId, userName, userEmail, isDialogAccepted, isDialogCreated}) => {

    const isDialogCreatePending = useIsDialogCreatePending(userId);

    const handleCreateDialog = () => {
        createDialogEvent(userId);
    }

    return (
        <Styled.Wrapper>
            <Styled.UserInfo>
                <Avatar size={50}>
                    {userName?.at(0)}
                </Avatar>
                <Styled.UserName>
                    {userName}
                </Styled.UserName>
                <Styled.UserEmail>
                    {userEmail}
                </Styled.UserEmail>
            </Styled.UserInfo>
            {
                isDialogCreated
                    ? (
                        isDialogAccepted ? (
                            <Button type={'primary'} icon={<ArrowRightOutlined />} >
                                Перейти к диалогу
                            </Button>
                        )
                        : (
                            <Button type={'primary'} disabled={true}>
                                Запрос на диалог отправлен
                            </Button>
                        )
                    )
                    : (
                        <Button
                            type={'primary'}
                            icon={<PlusOutlined />}
                            onClick={handleCreateDialog}
                            loading={isDialogCreatePending}
                        >
                            Начать диалог
                        </Button>
                    )
            }
        </Styled.Wrapper>
    )
})
