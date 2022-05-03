import {ETheme} from '../store/models/theme/types';
import {DarkThemeColors, LightThemeColors} from '../theme/colors';

export const useStyledComponentsTheme = (theme: ETheme) => {
    switch (theme) {
        case ETheme.Dark:
            return DarkThemeColors
        case ETheme.Light:
            return LightThemeColors
        default:
            return LightThemeColors
    }
}
