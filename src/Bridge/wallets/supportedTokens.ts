// Highly experimantal. The image addition does not work. need more research why.


/**
 * A dictionary of supported token names and their corresponding image file names.
 */
const SUPPORTED_TOKENS = {
    root: "https://github.com/Emmet-Finance/supported-tokens/blob/main/icons/",
    busd: "busd.svg",
    dai: "dai.svg",
    eth: "eth.svg",
    usdt: "usdt.svg"
}

/**
 * Represents a supported token name as a key of the SUPPORTED_TOKENS dictionary.
 */
type SupportedToken = keyof typeof SUPPORTED_TOKENS;


/**
 * Get the URL of the image for a supported token based on its name.
 *
 * @param tokenName - The name of the token (case-insensitive and space-insensitive).
 * @returns The URL of the token's image, or an empty string if the token is not supported or the input is invalid.
 */
export function getTokenImage(tokenName: string): string {
    // Check whether tokenName is not empty and is a string
    const token: SupportedToken | '' = tokenName && typeof tokenName === 'string'
        // Yes -> convert to lowercase & remove spaces if any
        ? tokenName.toLowerCase().replace(/[\s]/g, '') as SupportedToken
        // No -> convert to an empty string
        : '';

    const keys = Object.keys(SUPPORTED_TOKENS);

    // No correct token name -> no token image
    if (!token || !keys.includes(token)) { return '' }

    // If we're still here the tokenName is OK
    return `${SUPPORTED_TOKENS.root}${SUPPORTED_TOKENS[token]}`

}