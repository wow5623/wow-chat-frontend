import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Styled} from './DialogMessageInput-styled';
import TextArea from 'antd/lib/input/TextArea';
import {Button} from 'antd';
import {SendOutlined} from '@ant-design/icons';
import {createMessageEvent} from '../../../../store/models/messages';
import {checkIsMessageEmpty} from './utils/checkIsMessageEmpty';

export const DialogMessageInput: React.FC = () => {

    const [messageText, setMessageText] = useState('');

    const handleMessageChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessageText(event.target.value);
    }

    const handleMessageSend = () => {
        createMessageEvent(messageText);
        setMessageText('');
    }

    const handleEnterDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !checkIsMessageEmpty(messageText)) {
            handleMessageSend();
        }
    }

    return (
        <Styled.Wrapper>
            <TextArea
                placeholder="Введите ваше сообщение..."
                autoSize
                size={'large'}
                value={messageText}
                onChange={handleMessageChanged}
                onKeyDown={handleEnterDown}
            />
            <Button
                type="primary"
                shape="circle"
                icon={<SendOutlined />}
                size={'large'}
                onClick={handleMessageSend}
                disabled={checkIsMessageEmpty(messageText)}
            />
        </Styled.Wrapper>
    )
}
