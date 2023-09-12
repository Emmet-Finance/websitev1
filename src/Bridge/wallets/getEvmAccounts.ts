
import { MESSAGE_TYPE } from "emmet.sdk/wallets";

/**
 * Extracts EVM accounts from the wallet provider
 * @returns an array of EVM accounts or []
 */
export async function getEvmAccounts(ethereum: any): Promise<string[]> {
    try {
        if (ethereum) {
            // @ts-ignore
            const accounts: string[] = await ethereum.request<string[]>({
                method: MESSAGE_TYPE.ETH_REQUEST_ACCOUNTS,
            }) as string[];
            console.log("getEvmAccounts:", accounts)
            if (accounts) return accounts;
        }
    } catch (error) {
        throw new Error("Failed to get EVM accounts");
    }
    return [];
}