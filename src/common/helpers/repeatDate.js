import moment from 'moment';
moment.locale('en-bg');

/**
 *
 * @return {{date: (*|moment.Moment), day: Number, month: Number, year: Number, hours: Number, minutes: Number, seconds: Number, dayCount: number, daysInYear: number, monthText: string, progress: number}}
 */
export function repeatDate () {
    const date = moment(),
        day = parseInt(date.format('DD')),
        month = parseInt(date.format('MM')),
        monthText = date.format('MMMM'),
        year = parseInt(date.format('YYYY')),
        hours = parseInt(date.format('HH')),
        minutes = parseInt(date.format('mm')),
        seconds = parseInt(date.format('ss')),
        milliseconds = parseInt(date.format('SSS'));

    const yearStart = moment([year, 0, 1]);
    const daysInYear = moment([year, 11, 31]).diff(yearStart, 'days') + 1;
    const dayCount = date.diff(yearStart, 'days') + 1;
    const perSec = dayCount * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
    const full = 365 * 24 * 60 * 60;
    const progress = perSec / full * 100;

    return {
        date,
        day,
        month,
        year,
        hours,
        minutes,
        seconds,
        milliseconds,
        dayCount,
        daysInYear,
        monthText,
        progress
    };
}