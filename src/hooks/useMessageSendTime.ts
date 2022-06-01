import {format, isThisWeek, isThisYear, isToday, isYesterday} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import {useMemo} from 'react';

export const useMessageSendTime = (dateString: string | undefined) => {

    return useMemo(() => {
        if (!dateString) {
            return '';
        }

        const date = new Date(dateString);

        if (isToday(date)) {
            return format(date, 'HH:mm')
        }

        if (isYesterday(date)) {
            return 'вчера'
        }

        if (isThisWeek(date)) {
            return format(date, 'E', {
                locale: ruLocale,
            })
        }

        if (isThisYear(date)) {
            return format(date, 'do MMM', {
                locale: ruLocale,
            })
        }

        return format(date, 'dd.MM:yy', {
            locale: ruLocale,
        })

    }, [dateString])

}
