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
    console.log("humanToBigInt:n", n, typeof n)
    if (!n || (typeof n === 'string' && n.includes('NaN'))) { return 0n }
    let value: string, whole: string, fraction: string;

    value = replaceAll(n, ",", '');
    [whole, fraction] = value.split('.');

    if (!fraction) { fraction = '' }
    const _dec = typeof decimals === 'string' ? parseInt(decimals) : decimals;
    while (fraction.length < _dec) { fraction += '0' }
    console.log("whole", whole, "fraction", fraction)
    return BigInt(whole + fraction);
}

/**
 * Cuts an EVM address in the middle
 * @param address an EVM address
 * @returns a sliced version like 0xA12B...C345
 */
export function shortenAddress(address: string) {
    return `${address.slice(0, 6)}…${address.slice(38, 42)}`
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
        const cleanName = chainName
            .toLowerCase()
            .replace(/[^a-z]/g, '')
        return chains[cleanName as keyof T]
    }
    const keys = Object.keys(chains);
    const key = keys[0] as keyof T;
    return chains[key];
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

export function format2BigInt(
    a: string | number | bigint,
    b: string | number | bigint
): { _a: bigint, _b: bigint } {
    let _a, _b;
    if (typeof a === 'string') { _a = a.replace(/[^0-9]/g, '') }
    else { _a = a }
    if (typeof b === 'string') { _b = b.replace(/[^0-9]/g, '') }
    else { _b = b }
    return { _a: BigInt(_a), _b: BigInt(_b) }
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


export function chainNameToKey<T>(chainName: string): T {

    return (chainName
        .toLowerCase()
        .replace(/[^a-zA-Z]/g, '') as unknown) as T;

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
                cleaned = n.replace(/[^0-9.]/g, '');
                [whole, fraction] = cleaned.split('.')
                if (!fraction) { fraction = '' }
                const intger = BigInt(whole + fraction) / divider;
                fraction = BigInt(whole + fraction) % divider;
                whole = intger;
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
            const formattedFractionalPart = formatFractionalPart(fraction.toString());
            return `${whole.toLocaleString()}.${formattedFractionalPart}`
        } else {
            return whole.toLocaleString();
        }

    } else {
        return ''
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