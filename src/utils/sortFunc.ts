export function SortFunc (prop, arr) {
    prop = prop.split('.')
    let len = prop.length
    arr.sort(function (a:number, b:number) {
        let i = 0
        while( i < len ) { a = a[prop[i]]; b = b[prop[i]]; i++; }
        if (a < b) {
            return -1
        } else if (a > b) {
            return 1
        } else {
            return 0
        }
    });
    return arr
}