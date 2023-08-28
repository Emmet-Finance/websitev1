import { ethers } from './ethers';
import { chainNameToKey } from '../utils';
import { 
    ALL_CHAINS, 
    EVMChain, 
    SupportedTokenType, 
    allChainNameToIndex,
    testnetTokens,
} from 'emmet.sdk';
import FTBridge from 'emmet.sdk/abi/FTBridge';

export type TAllChainNames = keyof typeof ALL_CHAINS;
export type TTestnetTokens = keyof typeof testnetTokens;

export function getProvider(): ethers.providers.Web3Provider {
    const provider = new ethers.providers.Web3Provider(window?.ethereum!);
    console.log("getProvider", provider)
    return provider;
}

export async function getAccount(): Promise<string> {
    const [account] = await window?.ethereum!
        .request({ method: 'eth_requestAccounts' }) as string[];
    return account;
}

export async function getAddress(): Promise<string> {
    const provider = getProvider();
    const [address] = await provider.listAccounts();
    console.log("getAddress", address)
    return address;
}

export function getSigner(address:string): ethers.providers.JsonRpcSigner {
    // const account = await getAccount();
    // console.log("getSigner", account)
    // const address = await getAddress();
    // console.log("getSigner address", address)
    const provider = getProvider();
    console.log("getSigner provider", provider)
    const signer = provider.getSigner(address);
    console.log('getSigner', signer);
    return signer;
}

export function getSelectedChain(chainName: string): EVMChain {
    return ALL_CHAINS[chainNameToKey<TAllChainNames>(chainName)];
}

export function getBridgeAddress(chainName: string): string {
    const chain: EVMChain = getSelectedChain(chainName);
    return chain.bridge;
}

export async function getBridgeContract(
    chainName: string,
    senderAddress: string
) {
    const bridgeAddress: string = getBridgeAddress(chainName);
    console.log("bridgeAddress", bridgeAddress)
    const signer = getSigner(senderAddress);
    console.log("signer", signer)
    const contract = new ethers.Contract(
        bridgeAddress,
        FTBridge,
        signer
    );
    return contract;
}

// export async function estimateSend(
//     fromChain: string, 
//     toChain:string,
//     tokenName:string
// ){
//     console.log('ethers estimateSend')
//     const bridgeContract = await getBridgeContract(fromChain, );
//     console.log('bridgeContract', bridgeContract)
//     const chainId = allChainNameToIndex[toChain];
//     console.log('chainId', chainId)
//     const account: string = await getAddress();
//     console.log('account', account)
//     const gas = await bridgeContract.estimateGas.sendInstallment(
//         [
//             "1000000000000000000", // amount
//             chainId,
//             tokenName,
//             account
//         ]
//     );
//     console.log('gas', gas)
// }

// export async function estimateReceive(
//     toChain: string,
//     fromChain:string,
//     tokenName: string
// ){
//     const bridgeContract = await getBridgeContract(toChain);
//     // For estimation we use the MAX uint256
//     const actionId: bigint = 2n ** 256n - 1n;

//     const unhashed = `${toChain}-${fromChain}-${actionId.toString()}`
//     const txHash = ethers.utils.keccak256(
//         Buffer.from(unhashed, 'hex')
//     )
//     const chainId = allChainNameToIndex[fromChain];
//     const account: string = await getAddress();
//     return await bridgeContract.estimateGas.receiveInstallment(
//         txHash,
//         [
//             "1000000000000000000", // amount
//             chainId,
//             tokenName,
//             account
//         ]
//     )
// }

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
    const chainKey: string = chainName.toLowerCase().replace(/[^a-z]/g, '');

    // Get token address and ABI from selected token
    const tokenAddress: string = selToken.address[chainKey];
    const abi: any = selToken.abi;

    return [tokenAddress, abi];
}


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
    console.log('tokenAddress', tokenAddress, "abi", abi)
    // Get the browser signer
    const signer = await getSigner(sender);
    console.log("signer", signer)
    // Create and return the token contract handler with the browser signer
    const contract = new ethers.Contract(
        tokenAddress,
        abi,
        signer
    );
    return contract;
}


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
        console.log('inside approveERC20')
        // Get the token contract handler
        const contract = await getTokenContract(tokenName, chainName, sender);
        console.log('token contract', contract)
        // Find the original chain bridge contract
        const bridgeContractAddress: string = getBridgeAddress(chainName);
        console.log('bridge contract address', bridgeContractAddress)
        // Allow the bridge contract to spend the `amount` of tokens
        const receipt = await contract!.functions.approve(bridgeContractAddress, value);
        console.log('receipt', receipt)
        // Await the result to get the status
        const result = await receipt.wait();
        console.log('result', result)
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

