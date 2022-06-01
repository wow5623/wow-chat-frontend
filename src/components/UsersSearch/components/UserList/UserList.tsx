import React from 'react';
import {Styled} from './UserList-styled';
import {UserItem} from '../UserItem/UserItem';
import {TUserForMe} from '../../../../store/models/users/types';

interface IUserList {
    users: TUserForMe[] | null
}

export const UserList: React.FC<IUserList> = React.memo(({users}) => {

    if (!users || users.length === 0) {
        return (
            <Styled.Wrapper>
                <Styled.NotFoundMessage>
                    Ничего не найдено <span className={'emoji'}>😿</span>
                </Styled.NotFoundMessage>
            </Styled.Wrapper>
        )
    }

    return (
        <Styled.Wrapper>
            {
                users.map((user) => {
                    return (
                        <UserItem
                            key={user.id}
                            userId={user.id}
                            userEmail={user.email}
                            userName={user.name}
                            isDialogAccepted={user.isDialogAccepted}
                            isDialogCreated={user.isDialogCreated}
                        />
                    )
                })
            }
        </Styled.Wrapper>
    )

})
