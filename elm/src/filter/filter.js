export const time = function (val) {
    let date = new Date(val),
        year = date.getFullYear(),
        month = date.getMonth()+1,
        da = date.getDate(),
        h = date.getHours(),
        min = date.getMinutes();
    return `${year}-${month}-${da}  ${h}:${min}`
}