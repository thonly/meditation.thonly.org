export function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
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