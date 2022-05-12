import React, {memo, useEffect, useState} from 'react';
import { Styled } from './UsersSearch-styled';
import Search from 'antd/lib/input/Search';
import {UserList} from './components/UserList/UserList';
import {$users, $usersForMe, getAllUsersEvent, getAllUsersFx} from '../../store/models/users';
import {useStore} from 'effector-react';
import {Spin} from 'antd';

export const UsersSearch: React.FC = memo(() => {

    const [displaySearchResults, setDisplaySearchResults] = useState<boolean>(false);
    const usersLoading = useStore(getAllUsersFx.pending);

    const users = useStore($usersForMe);

    const onFocus = () => {
        setDisplaySearchResults(true)
    }

    const onBlur = () => {
        //setDisplaySearchResults(false)
    }

    const onSearch = (value: string) => {
    }

    useEffect(() => {
        getAllUsersEvent();
    }, [])

    return (
        <Styled.Wrapper>
            <Styled.SearchInputWrapper>
                <Search
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onSearch={onSearch}
                    size={'large'}
                    placeholder={'Введите имя пользователя, с которым хотите начать диалог...'}
                    enterButton={true}
                />
            </Styled.SearchInputWrapper>
            {
                displaySearchResults && (
                    <Styled.SearchResultsWrapper>
                        <Styled.SearchResultsBoxWrapper>
                            <Styled.SearchResultsBox>
                                {
                                    usersLoading
                                        ? (
                                            <Styled.UsersLoaderWrapper>
                                                <Spin size={'large'}/>
                                            </Styled.UsersLoaderWrapper>
                                        )
                                        : (
                                            <UserList users={users}/>
                                        )
                                }
                            </Styled.SearchResultsBox>
                        </Styled.SearchResultsBoxWrapper>
                    </Styled.SearchResultsWrapper>
                )
            }
        </Styled.Wrapper>
    )
})
