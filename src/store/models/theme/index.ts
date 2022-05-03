import {ETheme} from './types';
import {createEvent, createStore} from 'effector';

export const $theme = createStore<ETheme>(ETheme.Dark);

export const updateThemeEvent = createEvent<ETheme>()
