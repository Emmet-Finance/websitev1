import { EVMChain } from "emmet.sdk/types";
import { TCookie } from "./types";

/*****************************************************
 *                                                   *
 *                  C O O K I E S                    *
 *                                                   *
 *      1. addCookie                                 *
 *      2. cookieHasKey                              *
 *      3. deleteCookie                              *
 *      4. hasCookies                                *
 *      5. readCookieByKey                           *
 *                                                   *
 ****************************************************/


/**
 * Adds or updates a cookie
 * @param newCookie \{key,value,days?,hours?,minutes?,seconds?}
 */
export const addCookie = (newCookie: TCookie) => {
    let expire = new Date();
    if (newCookie.days) { expire.setDate(expire.getDate() + newCookie.days) }
    if (newCookie.hours) { expire.setHours(expire.getHours() + newCookie.hours) }
    if (newCookie.minutes) { expire.setMinutes(expire.getMinutes() + newCookie.minutes) }
    if (newCookie.seconds) { expire.setSeconds(expire.getSeconds() + newCookie.seconds) }
    document.cookie = `${newCookie.key}=${newCookie.value};domain=${window.location.hostname};path=/;expires=${expire};`
}


/**
 * Checks whether a key exists in a cookie
 * @param key the checked key
 * @returns true | false
 */
export const cookieHasKey = (key: string): boolean => {
    if (document
        .cookie
        .split(';')
        .some(item => item.trim()
            .startsWith(`${key}=`))) {
        return true;
    } else { return false; }
}


/**
 * Delets a cookie by key
 * @param key the lookup key
 */
export const deleteCookie = (key: string) => {
    if (hasCookies() && cookieHasKey(key)) {
        const toDelete: TCookie = {
            key,
            value: '',
            seconds: 1
        }
        addCookie(toDelete)

    }
}


/**
 * Checks wether cookies exist for this page
 * @returns true | false
 */
export const hasCookies = (): boolean => {
    return document.cookie.length > 0;
}


/**
 * Reads a cookie by key
 * @param key the lookup key
 * @returns the value or ''
 */
export const readCookieByKey = (key: string): string => {
    if (hasCookies() && cookieHasKey(key)) {
        const cookieValue = document.cookie.split(';')
            .find(item => item.trim().startsWith(`${key}=`));
        return cookieValue ? cookieValue.split('=')[1] : '';
    } else { return ''; }
}

/*****************************************************
 *                                                   *
 *                      W A L L E T                  *
 *                                                   *
 *      1. currentAccount                            *
 *      2. metamask                                  *
 *      3. copyAddressToClipboard                    *
 *      4. handleAccountsChanged                     *
 *                                                   *
 ****************************************************/

// Local storage
export let currentAccount: any = null;
let metamask: any;

try {
    metamask = (window as any).ethereum;
} catch (error) {
    console.error(error);
}
export { metamask };

/**
 * Copies some text to clipboard
 * @param data a string to be copied to clipboard
 */
export const copyAddressToClipboard = (account: string) => {
    navigator.clipboard.writeText(account);
}


/**
 * Sets the currentAccount to accounts[0]
 * @param accounts EVM accounts from a wallet
 */
export const handleAccountsChanged = (accounts: any[]) => {
    if (accounts.length === 0) {
        // TODO: replace with a pop-up window:
        console.log("Please, connect to a wallet")
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
    }
}

// ================== moved to Emmet.SDK =============================

/**
 * Converts a (big) number to a string like 123,456.00
 * @param balance - processed amount of tokens
 * @param decimals - power of 10 to convert wei to ETH, defaults to 18
 * @returns a formattted number with commas & dots or 0.00
 */
export const bnToHumanReadable = (
    bi: bigint | number | string | undefined,
    decimals: number = 18
): string => {
    if (!bi) return '';

    const cleaned: string = replaceAll(bi.toString(), ",", '')
    let value: bigint = BigInt(cleaned.replace('.', ''));
    const dividend = BigInt(10 ** decimals);

    let whole = value / dividend;
    let formattedWhole: string;
    if (!whole) { whole = 0n }
    formattedWhole = whole.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let fraction = value % dividend;
    if (!fraction) { fraction = 0n }
    let digits: number = !fraction
        ? 0
        : significantDigits(fraction.toString());

    const factor = BigInt(10 ** digits);
    const roundedFraction = fraction * factor / dividend;
    let formattedFraction = roundedFraction.toString().padStart(digits, '0');
    return `${formattedWhole}.${formattedFraction}`
}


function significantDigits(value: string): number {
    let _value = value;
    let decimals: number = 0;
    for (const char of _value) {
        if (char === '0') {
            return decimals;
        }
        decimals += 1;
    }
    return 0;
}


export function getSlippage(
    amount: bigint | string | number,
    slippage: bigint | string | number
): bigint {
    return BigInt(amount) * BigInt(slippage) / 100n;
}

/**
 * Converts a human readable number 123,456.00 to 123456n * 10n ^ decimals
 * @param amount a potential big number
 * @param decimals power of 10 to convert wei to ETH, defaults to 18
 * @returns 0n or an actual BigInt
 */
export const stringToBigNum = (
    amount: string,
    decimals: number = 18
): bigint => {
    let result: bigint = 0n
    if (amount && typeof amount === 'string') {
        const cleaned = amount.replace(',', '').replace('.', '');
        if (/^[0-9]+$/.test(cleaned)) {
            const multiplier = 10n ** BigInt(decimals);
            result = (BigInt(cleaned) * multiplier);
        }
    }
    return result;
}

export function replaceAll(s: string, search: string, replace: string) {
    return s.split(search).join(replace);
}

export function humanToBigInt(
    n: string | undefined,
    decimals: number | string = 18
): bigint {

    if (!n || (typeof n === 'string' && n.includes('NaN'))) { return 0n }
    let value: string, whole: string, fraction: string;

    value = replaceAll(n, ",", '');
    [whole, fraction] = value.split('.');

    if (!fraction) { fraction = '' }
    const _dec = typeof decimals === 'string' ? parseInt(decimals) : decimals;
    while (fraction.length < _dec) { fraction += '0' }

    return BigInt(whole + fraction);
}


/**
 * Shortens a cryptocurrency address by replacing the middle portion with an ellipsis.
 *
 * @param {string} address - The full cryptocurrency address to be shortened.
 * @param {number} first - The number of characters to keep from the beginning of the address (default: 6).
 * @param {number} last - The number of characters to keep from the end of the address (default: 6).
 * @returns {string} - The shortened address with the specified number of characters at the beginning and end, separated by an ellipsis.
 */
export function shortenAddress(address: string, first: number = 6, last: number = 6) {
    const length = 42;

    // Check for invalid input and edge cases.
    if (!address || first < 0 || last < 0 || last > length) {
        return '';
    }

    // If the requested characters to keep from the beginning are more than the address length,
    // return the original address.
    if (first >= length) {
        return address;
    }

    // Shorten the address by replacing the middle part with an ellipsis ('…').
    return `${address.slice(0, first)}…${address.slice(length - last, length)}`;
}


/**
 * Finds one chain by name
 * @param chains a hashmap of supported chains
 * @param chainName the selected one
 * @returns only the selected chain
 */
export function findChain<T>(
    chains: { [key in keyof T]: EVMChain },
    chainName: string
): EVMChain {
    if (chains && chainName) {
        console.log("findChain:chainName", chainName)
        const cleanName = chainName
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '')
        return chains[cleanName as keyof T]
    }
    const keys = Object.keys(chains);
    const key = keys[0] as keyof T;
    const chain = chains[key];
    return chain;
}

/**
 * Removes the selected chain from the list
 * @param chains an array of supported chains
 * @param chainName the selected one
 * @returns the original list minus selected
 */
export function filterOneOut<T>(
    chains: { [key in keyof T]: EVMChain },
    chainName: string
): EVMChain[] | [] {

    if (chains && chainName) {
        const chainValues: EVMChain[] | [] = Object.values(chains)
        try {
            return chainValues.filter(chain =>
                chain.name.toLowerCase() !== chainName.toLowerCase());
        } catch (error) {
            console.error(error)
            return [];
        }

    }
    return [];
}

/**
 * Removes 2 chains from an array
 * @param chains a hashmap of chains
 * @param chainOneName first chain name
 * @param chainTwoName second chain name
 * @returns the original list minus filtered
 */
export function filterTwoOut<T>(
    chains: { [key in keyof T]: EVMChain },
    chainOneName: string,
    chainTwoName: string,
): EVMChain[] | [] {
    if (chains && chainOneName && chainTwoName) {
        const chainValues: EVMChain[] | [] = Object.values(chains);
        try {
            return chainValues.filter(chain =>
                chain.name.toLowerCase().replace(/[^a-z0-9]/g, '') !== chainOneName.toLowerCase()
                && chain.name.toLowerCase().replace(/[^a-z0-9]/g, '') !== chainTwoName.toLowerCase()
            );
        } catch (error) {
            console.error(error)
            return [];
        }
    }
    return [];
}

export function format2BigInt(
    a: string | number | bigint,
    b: string | number | bigint
): { _a: bigint, _b: bigint } {
    let _a, _b;
    if (a && typeof a === 'string') {
        if (isHexString(a)) {
            _a = hexToDecimalString(a)
        } else {
            _a = a.replace(/[^0-9]/g, '')
        }
    }
    else { _a = a }
    if (b && typeof b === 'string') {
        if (isHexString(b)) {
            _b = hexToDecimalString(b)
        } else {
            _b = b.replace(/[^0-9]/g, '')
        }

    }
    else { _b = b }
    return { _a: _a ? BigInt(_a) : 0n, _b: _b ? BigInt(_b) : 0n }
}

/**
 * Checks whether a >= b
 * @param a 
 * @param b 
 * @returns true | false
 */
export const isGreaterOrEqual = (
    a: string | number | bigint,
    b: string | number | bigint
): boolean => {
    const { _a, _b } = format2BigInt(a, b);
    return (BigInt(_a) >= BigInt(_b));
}

/**
 * Returns unsigned integer difference
 * @param a dividend x decimals
 * @param b divider x decimals
 * @returns uint256 difference
 */
export const getUintDiff = (
    a: string | number | bigint,
    b: string | number | bigint
): bigint => {
    const { _a, _b } = format2BigInt(a, b);
    if (a && b) {
        return BigInt(_a) - BigInt(_b);
    }
    return 0n;
}

export function formatChainName(chainName: string): string {
    return chainName
        .replace(/[^a-zA-Z0-9]/g, '')
}


export function chainNameToKey<T>(chainName: string): T {

    return (formatChainName(chainName).toLowerCase() as unknown) as T;

}

/**
 * Convert a hexadecimal string to a decimal string.
 * 
 * @param {string} s The hexadecimal string to convert.
 * @returns {string} The decimal representation of the hexadecimal string.
 * 
 * @example
 * ```js
 * const hexadecimalString = "0x89f8e091e5e80d5";
 * const decimalString = hexToDecimalString(hexadecimalString);
 * console.log(`Hexadecimal: ${hexadecimalString}`);
 * console.log(`Decimal: ${decimalString}`);
 * // Output:
 * // Hexadecimal: 0x89f8e091e5e80d5
 * // Decimal: 621371443415777493
 * ```
 */
function hexToDecimalString(s: string): string {

    // Define a mapping from hexadecimal characters to decimal values
    const hexToDecimalMap: Record<string, string> = {
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        'a': '10',
        'b': '11',
        'c': '12',
        'd': '13',
        'e': '14',
        'f': '15',
    };

    // Remove the '0x' prefix if it exists
    let hexString: string = s.startsWith('0x')
        ? s.slice(2)
        : s;

    let decimalValue = '0';

    // Iterate through the hexadecimal string from right to left
    for (let i = hexString.length - 1; i >= 0; i--) {
        const hexDigit = hexString[i].toLowerCase();
        const decimalDigit = hexToDecimalMap[hexDigit];
        if (decimalDigit === undefined) {
            throw new Error(`Invalid hexadecimal character: ${hexDigit}`);
        }
        const powerOf16 = BigInt(hexString.length - 1 - i);
        const digitValue = BigInt(decimalDigit);
        decimalValue = (BigInt(decimalValue) + digitValue * (16n ** powerOf16)).toString();
    }

    return decimalValue;
}

/**
 * Check if a given string is a valid hexadecimal string with or without the '0x' prefix.
 * @param s The string to check.
 * @returns True if the string is a valid hexadecimal string, false otherwise.
 * 
 * @example
 * ```ts
 * console.log(isHexString("0x89f8e091e5e80d5")); // true
 * console.log(isHexString("89f8e091e5e80d5"));  // true
 * console.log(isHexString("123XYZ"));           // false
 * ```
 */
function isHexString(s: any): boolean {
    // Check if the input is a string
    if (!s || typeof s !== 'string') return false;

    // Define a regular expression pattern for a hexadecimal string
    const hexadecimalRegex = /^0x[0-9A-Fa-f]+$/g;

    // Test if the string matches the pattern
    return hexadecimalRegex.test(s);
}

/**
 * Converts a bigint or string * decimals
 * @param n an amount to be converted
 * @param decimals places after period
 * @returns an integer or a float as string
 */
export function bigIntToHuman(
    n: string | number | bigint | undefined,
    decimals: string | number | bigint = 18n
): string {

    if (n && decimals) {
        let cleaned: string | number | bigint | boolean;
        let whole, fraction: string | number | bigint;
        let divider: bigint = typeof decimals === 'string'
            ? 10n ** BigInt(parseInt(decimals))
            : 10n ** BigInt(decimals);

        switch (typeof n) {
            case 'string':
                if (isHexString(n)) {
                    cleaned = hexToDecimalString(n);
                } else {
                    cleaned = n.replace(/[^0-9.]/g, '');
                }
                [whole, fraction] = cleaned.split('.')

                if (!fraction) {
                    fraction = ''
                    const intger = BigInt(whole + fraction) / divider;
                    fraction = BigInt(whole + fraction) % divider;
                    whole = intger;
                }
                break;
            case 'number':
                whole = parseInt(n.toString());
                fraction = (parseFloat(n.toString()) - whole)
                    .toString()
                    .split('.')[1]
                fraction = parseInt(fraction) > 0 ? parseInt(fraction) : 0;
                break;
            case 'bigint':
                whole = BigInt(n) / divider;
                fraction = BigInt(n) % divider;
                break;
        }

        if (fraction) {
            let formattedFractionalPart = formatFractionalPart(zerroPadding(fraction, decimals, 8));
            if (formattedFractionalPart.length > 8) {
                formattedFractionalPart = formattedFractionalPart.slice(0, 8)
            }
            return `${whole.toLocaleString()}.${formattedFractionalPart}`
        } else {
            return whole ? whole.toLocaleString() : '0.00';
        }

    } else {
        return '0.00'
    }
}

/**
 * Zero-pads a string, number, or bigint to reach the desired target length.
 *
 * @param inputString The input string, number, or bigint to be zero-padded.
 * @param targetLength The target length for the resulting padded string.
 * @returns The input value zero-padded to the specified target length as a string.
 */
export function zerroPadding(
    inputString: string | number | bigint,
    decimals: string | number | bigint,
    targetLength: string | number | bigint
): string {
    // Cast the arguments to the expected types
    const s: string = BigInt(inputString).toString();
    const d: number = parseInt(BigInt(decimals).toString());
    const L: number = parseInt(BigInt(targetLength).toString());
    // Compute padding
    if (d > s.length) {
        const padding: string = '0'.repeat(d - s.length);
        // Return a padded string
        return `${padding}${s.slice(0, L)}`;
    } else {
        return s;
    }
}

/**
 * Removes the trailing insignificant zeros
 * @param fraction the fractional part of a number
 * @returns a fractional number without insignificant zeros
 * 
 * Example:
 * ```ts
 * const formatted: string = formatFractionalPart("123.4560700")
 * ```
 * 
 * Returns: `123.45607`
 */
export function formatFractionalPart(fraction: string): string {
    if (fraction) {
        let lastSignificant = -1;
        for (let i = fraction.length - 1; i >= 0; i--) {
            if (fraction[i] !== '0') {
                lastSignificant = i;
                break;
            }
        }
        // Find the index of the last non-zero digit in the fractional part
        const lastNonZeroIndex = lastSignificant >= 0
            ? lastSignificant + 1 : 0;
        [...fraction].reverse().findIndex(char => char !== '0');
        // Construct the formatted number with the determined significant digits
        const formattedFractionalPart = fraction.substring(0, lastNonZeroIndex);
        return formattedFractionalPart;
    } else {
        return '';
    }
}