import { SupportedTokenType, testnetTokens } from "emmet.sdk";

export type TTestnetTokens = keyof typeof testnetTokens;
/**
 * Gets the token address and ABI based on the token name and chain name.
 * 
 * @param tokenName The name of the token.
 * @param chainName The name of the chain.
 * @returns A tuple containing the token address and ABI.
 */
export function getTokenAddressAndAbi(
    tokenName: string,
    chainName: string
): [string, any] {
    // Convert tokenName to uppercase and use as key to fetch corresponding token info
    const key: TTestnetTokens = tokenName.toUpperCase() as TTestnetTokens;
    const selToken: SupportedTokenType = testnetTokens[key];

    // Normalize chain name for consistency
    const chainKey: string = chainName.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Get token address and ABI from selected token
    const tokenAddress: string = selToken.address[chainKey];
    const abi: any = selToken.abi;

    return [tokenAddress, abi];
}