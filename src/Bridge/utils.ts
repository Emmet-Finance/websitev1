
export * from 'emmet.sdk/utils';
import {TCookie} from "./types";

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
        return document
            .cookie
            .split(';')
            .find(item => {
                return item.trim()
                    .startsWith(`${key}=`)
            })?.split('=')[1] as string;
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
export {metamask};

/**
 * Copies some text to clipboard
 * @param data a string to be copied to clipboard
 */
export const copyAddressToClipboard = (account:string) => {
    navigator.clipboard.writeText(account);
}


/**
 * Sets the currentAccount to accounts[0]
 * @param accounts EVM accounts from Metamask
 */
export const handleAccountsChanged = (accounts: any[]) => {
    if (accounts.length === 0) {
        // TODO: replace with a pop-up window:
        console.log("Please, connect to Metamask")
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
    }
}
