import React, {ChangeEvent, useEffect} from 'react';
import {Styled} from './DialogsBar-styled';
import {useStore} from 'effector-react';
import {$visibleMyDialogs, getAllMeDialogsEvent, searchDialogByPartnerEvent} from '../../store/models/dialogs';
import {DialogList} from './components/DialogList/DialogList';
import {Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';

export const DialogsBar: React.FC = React.memo(() => {

    const dialogs = useStore($visibleMyDialogs);

    const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
        searchDialogByPartnerEvent(event.target.value);
    }

    useEffect(() => {
        getAllMeDialogsEvent();
    }, [])

    return (
        <Styled.Wrapper>
            <Styled.DialogsSearch>
                <Input
                    placeholder="Поиск диалога..."
                    prefix={<SearchOutlined/>}
                    onChange={onSearch}
                    size={'large'}
                />
            </Styled.DialogsSearch>
            <DialogList dialogs={dialogs}/>
        </Styled.Wrapper>
    )

})
