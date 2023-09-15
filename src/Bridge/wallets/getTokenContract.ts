import { ethers } from "ethers";
import { getTokenAddressAndAbi } from "./getTokenAddressAndAbi";
import { getSigner } from "./getSigner";

/**
 * Creates the token contract handler with a browser signer.
 * 
 * @param tokenName The symbol of the token.
 * @param chainName The original chain to find the token contract.
 * @returns The token contract handler with the browser signer.
 */
export const getTokenContract = async (
    tokenName: string,
    chainName: string,
    sender:string
): Promise<ethers.Contract | undefined> => {
    // Get the token address and ABI for the specified token and chain
    const [tokenAddress, abi] = getTokenAddressAndAbi(tokenName, chainName);
    // Get the browser signer
    const signer = await getSigner(sender);
    // Create and return the token contract handler with the browser signer
    const contract = new ethers.Contract(
        tokenAddress,
        abi,
        signer
    );
    return contract;
}