import { getBridgeAddress } from "./getBridgeAddress";
import { getTokenContract } from "./getTokenContract";

/**
 * Approves token transfers
 * @param chainName original chain to find the token contract
 * @param value amount planned for approval
 * @param token token symbol, ex.: USDT
 * @returns \{ hash: string, status: number, amount: BigInt }
 */
export const approveERC20 = async (
    chainName: string,
    value: string,
    tokenName: string,
    sender:string
): Promise<{ hash: string, status: number, amount: string }> => {

    try {
        // Get the token contract handler
        const contract = await getTokenContract(tokenName, chainName, sender);
        // Find the original chain bridge contract
        const bridgeContractAddress: string = getBridgeAddress(chainName);
        // Allow the bridge contract to spend the `amount` of tokens
        const receipt = await contract!.functions.approve(bridgeContractAddress, value);
        // Await the result to get the status
        const result = await receipt.wait();
        
        if (result) {
            // Get the transaction hash
            const hash: string = result.transactionHash;
            // 1 - success, 0 - reverted
            const status: number = result.status as number;
            return { hash, status, amount: value }
        } else {
            throw new Error("Failed to receive the transaction response");
        }

    } catch (error) {
        console.error(error);
        return { hash: '', status: 0, amount: '' };
    }

}