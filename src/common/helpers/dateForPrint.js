import {twoDigitsAlways} from './twoDigitsAlways';

export function dateForPrint (date) {
    const day = twoDigitsAlways(date.getDate());
    const month = twoDigitsAlways(date.getMonth());
    const year = twoDigitsAlways(date.getFullYear());
    const hour = twoDigitsAlways(date.getHours());
    const minutes = twoDigitsAlways(date.getMinutes());
    const seconds = twoDigitsAlways(date.getSeconds());

    const justDate = `${day}.${month}.${year}`;
    const time = `${hour}:${minutes}:${seconds}`;

    return `${justDate} <br /> ${time}`;
}