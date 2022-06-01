import React, {useEffect} from 'react';
import {DialogMessageInput} from './components/DialogMessageInput/DialogMessageInput';
import {DialogMessageList} from './components/DialogMessageList/DialogMessageList';
import {DialogHeader} from './components/DialogHeader/DialogHeader';
import {Styled} from './Dialog-styled';
import {Helmet} from 'react-helmet';
import {useParams} from 'react-router-dom';
import {TDialogRouteParams} from './types';
import {
    $currentDeriveKey,
    $currentDialog,
    $partner,
    generateDeriveKeyEvent,
    getCurrentDialogEvent,
    getCurrentDialogFx
} from '../../store/models/dialogs';
import {useStore} from 'effector-react';
import {Loader} from '../Loader/Loader';
import {$service} from '../../store/models/events';
import {
    $messages,
    $myMessages,
    $partnerUnreadMessagesIds,
    getAllMessagesByDialogEvent,
    markMessagesAsReadEvent
} from '../../store/models/messages';


export const Dialog: React.FC = () => {

    const routeParams = useParams<TDialogRouteParams>();

    const dialog = useStore($currentDialog);
    const dialogPending = useStore(getCurrentDialogFx.pending);
    const partner = useStore($partner);
    const socketService = useStore($service);
    const deriveKey = useStore($currentDeriveKey);
    const partnerUnreadMessages = useStore($partnerUnreadMessagesIds);
    const messages = useStore($messages);

    useEffect(() => {
        if (!!routeParams.dialogId) {
            getCurrentDialogEvent(routeParams.dialogId);
        }
    }, [routeParams.dialogId])

    useEffect(() => {
        if (!!dialog && !!partner) {
            generateDeriveKeyEvent();
        }
    }, [partner, dialog]);

    useEffect(() => {
        socketService?.socket.on('SERVER:NEW_MESSAGE', (message) => {
            console.log('NEW MESSAGE!', message);
            if (!!deriveKey) {
                getAllMessagesByDialogEvent();
            }
        })
        socketService?.socket.on('SERVER:MESSAGES_READ', () => {
            if (!!deriveKey) {
                getAllMessagesByDialogEvent();
            }
        })
    }, [socketService, deriveKey])

    useEffect(() => {
        if (!!partnerUnreadMessages && partnerUnreadMessages.length > 0) {
            markMessagesAsReadEvent(dialog?.id ?? '');
        }
    }, [dialog, partnerUnreadMessages])

    if (dialogPending || !messages) {
        return (
            <Loader/>
        )
    }

    return (
        <>
            <Helmet>
                <title>
                    Диалог
                </title>
            </Helmet>
            <Styled.Wrapper>
                <DialogHeader partnerName={partner?.user?.name}/>
                <DialogMessageList/>
                <DialogMessageInput/>
            </Styled.Wrapper>
        </>
    )
}
