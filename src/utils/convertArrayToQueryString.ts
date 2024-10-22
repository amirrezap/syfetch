export default function arrayToGetString(key: string, array: string[] | number[] | boolean[]): string {
    if (array.length === 0) return '';

    const encodedKey = encodeURIComponent(key);
    const encodedValues = array.map(value => encodeURIComponent(value));

    if (array.length === 1) {
        return `${encodedKey}[]=${encodedValues[0]}`;
    }

    return encodedValues.map(value => `${encodedKey}=${value}`).join('&');
}
