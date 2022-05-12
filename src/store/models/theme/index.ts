import {ETheme} from './types';
import {createEvent, createStore} from 'effector';

export const $theme = createStore<ETheme>(ETheme.Light);

export const updateThemeEvent = createEvent<ETheme>()
