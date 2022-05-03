import {forward} from 'effector';
import {$theme, updateThemeEvent} from './index';
import {persist} from 'effector-storage/local';

forward({
    from: updateThemeEvent,
    to: $theme
})

persist({
    store: $theme,
    key: 'theme'
})
