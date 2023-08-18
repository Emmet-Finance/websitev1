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
    balance: bigint | number | string | undefined,
    decimals: number = 18,
    digits: number = 2
): string => {
    if (balance) {
        const divisor = 10n ** BigInt(decimals);

        const cleaned = balance.toString().replace('.', '').replace(',', '')
        if (/^[0-9]+$/.test(cleaned)) {
            const balanceBigInt = BigInt(cleaned);
            const integerPart = Math.floor(Number(balanceBigInt / divisor)).toString();
            const decimalPart = balanceBigInt % divisor;

            const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            const formattedDecimal = decimalPart
                .toString()
                .padStart(decimals, "0")
                .slice(0, digits);

            const formatted = `${formattedInteger}.${formattedDecimal}`;

            return formatted;
        }
    }
    return '0.00';
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
    if (amount && typeof amount === 'string') {
        const cleaned = amount.replace(',', '').replace('.', '');
        if (/^[0-9]+$/.test(cleaned)) {
            const multiplier = Math.pow(10, decimals);
            return (BigInt(cleaned) * BigInt(multiplier));
        }
    }
    return 0n
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
 * @param chains an array of supported chains
 * @param chainName the selected one
 * @returns only the selected chain
 */
export function findChain(chains: EVMChain[], chainName: string): EVMChain {
    return chains.filter(chain =>
        chain.name.toLowerCase() === chainName.toLowerCase())[0];
}

/**
 * Removes the selected chain from the list
 * @param chains an array of supported chains
 * @param chainName the selected one
 * @returns the original list minus selected
 */
export function filterOneOut(chains: EVMChain[], chainName: string): EVMChain[] {
    return chains.filter(chain =>
        chain.name.toLowerCase() !== chainName.toLowerCase());
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
    if (a && b) {
        return (BigInt(a) >= BigInt(b))
    }
    return false;
}