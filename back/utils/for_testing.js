//genera un palindromo
const palindrome = (string) => {
    if (typeof string === 'undefined') return
    return string
        .split('') //convertimos en array
        .reverse() //le damos la vuelta
        .join('') //juntamos de nueva cuenta y lo convertimos en string otra vez
}

//metodo calcula la media
const avergage = array => {
    if (typeof array === 'undefined') return
    if (array.length === 0) return 0
    let sum = 0
    array.forEach(num => { sum += num })
    return sum / array.length

}

module.exports = {
    palindrome, avergage
}