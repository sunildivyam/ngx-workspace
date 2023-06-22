const dashToCamel = (str, startWithCapital = false) => {
    str = str.split('');
    let i = 0;
    let camel = '';
    do {
        if (str[i] === '-') {
            camel += str[i + 1].toUpperCase();
            i += 2;
        } else {
            camel += startWithCapital && i === 0 ? str[i].toUpperCase() : str[i];
            i++;
        }
    } while (i < str.length)

    return camel;
}

/**
 * returns the relative path to the root of the given path.
 * Example: relative root path for projects/ngx-common-ui/ngx-card
 * is ../../..
 * @param {*} path
 */
const relativeRoot = (path) => {
    const levelCount = path.split('/').length;
    let relativePath = '';
    for (let i = 0; i < levelCount; i++) {
        relativePath += '../';
    }

    return relativePath;
}

module.exports = {
    dashToCamel,
    relativeRoot,
}
