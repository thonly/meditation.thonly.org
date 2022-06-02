export function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getDuration(startTime) {
    return getFormattedTime((new Date() - startTime) / 1000);
}

// deprecated
export function getAlarmTime(startTime, minutes) {
    const endTime = new Date(startTime.getTime() + minutes*60000);
    return getFormattedTime((endTime - new Date()) / 1000);
}

export function getFormattedTime(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor(totalSeconds % 3600 / 60);
    const s = Math.floor(totalSeconds % 3600 % 60);

    const hours = String(h).padStart(2, '0');
    const minutes = String(m).padStart(2, '0');
    const seconds = String(s).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}