const strCapitalize = (str: string) => {
    if (!str) return str;
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const getFullName = (firstName: string, lastName: string) => {
    return (`${firstName} ${lastName}`);
}

export { strCapitalize, getFullName };