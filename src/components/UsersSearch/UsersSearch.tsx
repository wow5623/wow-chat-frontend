import React, {ChangeEvent, memo, useEffect, useRef, useState} from 'react';
import {Styled} from './UsersSearch-styled';
import Search from 'antd/lib/input/Search';
import {UserList} from './components/UserList/UserList';
import {
    $usersForMe,
    $visibleUsersForMe,
    getAllUsersEvent,
    getAllUsersFx,
    searchUserByNameEvent
} from '../../store/models/users';
import {useStore} from 'effector-react';
import {Input, Spin} from 'antd';
import {SearchOutlined} from '@ant-design/icons';

export const UsersSearch: React.FC = memo(() => {

    const [displaySearchResults, setDisplaySearchResults] = useState<boolean>(false);
    const usersLoading = useStore(getAllUsersFx.pending);

    const searchResultBoxElement = useRef<HTMLDivElement>(null);
    const searchInputWrapperElement = useRef<HTMLDivElement>(null);

    const users = useStore($visibleUsersForMe);

    const hideSearchResults = () => {
        setDisplaySearchResults(false)
    }

    const showSearchResults = () => {
        setDisplaySearchResults(true)
    }

    const handleClickOutsideResultsSearchBox = (event: MouseEvent) => {
        if (
            searchResultBoxElement.current && searchInputWrapperElement.current
            && !searchResultBoxElement.current.contains(event.target as Node)
            && !searchInputWrapperElement.current.contains(event.target as Node)
        ) {
            hideSearchResults();
        }
    }

    const onFocus = () => {
        showSearchResults()
    }

    const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
        searchUserByNameEvent(event.target.value);
    }

    useEffect(() => {
        getAllUsersEvent();
        document.addEventListener('click', handleClickOutsideResultsSearchBox, false);
        return () => {
            document.removeEventListener('click', handleClickOutsideResultsSearchBox, false);
        }
    }, [])

    return (
        <Styled.Wrapper>
            <Styled.SearchInputWrapper ref={searchInputWrapperElement}>
                <Input
                    onFocus={onFocus}
                    onChange={onSearch}
                    prefix={<SearchOutlined/>}
                    size={'large'}
                    placeholder={'Введите имя пользователя, с которым хотите начать диалог...'}
                />
            </Styled.SearchInputWrapper>
            {
                displaySearchResults && (
                    <Styled.SearchResultsWrapper>
                        <Styled.SearchResultsBoxWrapper>
                            <Styled.SearchResultsBox ref={searchResultBoxElement}>
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
