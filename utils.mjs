export function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getFormattedDuration(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor(totalSeconds % 3600 / 60);
    const s = Math.floor(totalSeconds % 3600 % 60);

    const hours = String(h).padStart(2, '0');
    const minutes = String(m).padStart(2, '0');
    const seconds = String(s).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

export function getDigitalRoot(number) {
    let sum = number
    let arr = []
    let reducer = (a,b) => parseInt(a) + parseInt(b)
 
    while (sum > 9) {
       arr = sum.toString().split("")
       sum = arr.reduce(reducer)
    }
 
    return sum
 }