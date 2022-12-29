export const isValidatedTwitterPostLink = (url) => {
    const regex = /^(((https?):\/\/)?(www.)?)twitter\.com(\/(\w){1,15})\/status\/[0-9]{19}$/;
    return regex.test(url);
}

export const getFormattedDatetimeString = (date) => {
    const m = new Date(date);
    return m.toLocaleString();
}