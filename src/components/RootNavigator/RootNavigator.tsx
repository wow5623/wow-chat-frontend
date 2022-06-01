import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {Dialog} from '../Dialog/Dialog';
import React, {memo} from 'react';
import {Auth} from '../Auth/Auth';
import {Profile} from '../Profile/Profile';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import './style.css';
import {NotFound} from '../NotFound/NotFound';
import {ConfirmEmail} from '../ConfirmEmail/ConfirmEmail';

export const RootNavigator = memo(() => {

    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition key={location.pathname} classNames="fade" timeout={500}>
                <Routes>
                    <Route path="/" element={
                        <Navigate to={'/auth'}/>
                    }/>
                    <Route path="/dialog/:dialogId" element={<Dialog />}/>
                    <Route path="/profile" element={<Profile />}/>
                    <Route path="/confirm_email" element={<ConfirmEmail />}/>
                    <Route path="/auth">
                        <Route path="/auth" element={
                            <Navigate to={'/auth/login'}/>
                        }/>
                        <Route path="/auth/login" element={<Auth authFlow={'login'} />}/>
                        <Route path="/auth/register" element={<Auth authFlow={'register'} />}/>
                    </Route>
                    <Route path="*" element={
                        <NotFound/>
                    }/>
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    )
})
