import { BridgeChainIds, TChainName, formatChainName } from "emmet.sdk";
import { getBridgeContract } from "./getBridgeContract";
import { getMetamaskProvider } from "./getMetamaskProvider";
import { isThisChainsNativeCoin } from "./isThisChainsNativeCoin";

export async function transferERC20(
    fromChain: TChainName,
    toChainName: TChainName,
    tokenName: string,
    amount: string,
    receiver: string
): Promise<{ hash: string, status: number, amount: string }> {
    try {
        const ethereum: any = getMetamaskProvider();
        // Get the current sender account
        const [account] = await ethereum.request({ method: 'eth_requestAccounts' }) as string[];
        // get the bridge contract
        const contract = await getBridgeContract(fromChain, account)

        const chainId: number = BridgeChainIds[formatChainName(toChainName).toLowerCase() as keyof typeof BridgeChainIds]
        // Arguments of the function
        const args: [[bigint, number, string, string]] = [[
            BigInt(amount),
            chainId,
            tokenName.toUpperCase(),
            receiver
        ]];
        const receipt = isThisChainsNativeCoin(tokenName.toUpperCase(), fromChain, 'testnet')
            ? await contract!.functions.sendInstallment(...args, { value: amount })
            : await contract!.functions.sendInstallment(...args);
        // Await the result to get the status
        const result = await receipt.wait();
        if (result) {
            // Get the transaction hash
            const hash: string = result.transactionHash;
            // 1 - success, 0 - reverted
            const status: number = result.status as number;
            return { hash, status, amount }
        } else {
            throw new Error("Failed to receive the transfer transaction response");
        }

    } catch (error) {
        console.error(error);
        return { hash: '', status: 0, amount: '' };
    }
}