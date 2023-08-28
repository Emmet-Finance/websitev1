import {
    custom,
    formatEther,
    encodeFunctionData,
    createPublicClient,
    createWalletClient,
    http,
} from 'viem';

import {
    EVMChain,
    SupportedTokenType,
    TChainName,
    allChainNameToIndex,
    testnets
} from "emmet.sdk/types";
import { getPublicClient } from 'emmet.sdk/utils/viem';
import FTBridge from 'emmet.sdk/abi/FTBridge';
import {
    ALL_CHAINS,
    testnetTokens
} from 'emmet.sdk'

import { chainNameToKey } from '../utils';

export type TAllChainNames = keyof typeof ALL_CHAINS;

/**
 * Estimates local TX fee in `wei`
 * @param amount number of tokens planned for transfer
 * @param account the address of the owner & sender of the tokens
 * @param fromChainName the name of the departure chain
 * @param toChainName the name of the destination chain
 * @param tokenName the uppercased token name (symbol)
 * @returns a bigint | 83889n
 */
export async function estimateSend(
    amount: string | bigint,
    account: string,
    fromChainName: TChainName,
    toChainName: string,
    tokenName: string
): Promise<bigint> {

    try {

        const selectedChain = testnets.filter(net =>
            net.name === fromChainName)[0];
        console.log("selectedChain", selectedChain)

        const publicClient = getPublicClient(account, fromChainName, [selectedChain], true);
        console.log("publicClient", publicClient)

        const chainId = allChainNameToIndex[toChainName];

        const populatedArgs: [bigint, number, string, string] = [
            BigInt(amount),
            chainId,
            tokenName,
            account
        ];

        const estimation = await publicClient?.estimateContractGas({
            address: `0x${selectedChain.bridge.slice(2)}`,
            abi: FTBridge,
            functionName: 'sendInstallment',
            args: [populatedArgs],
            account: `0x${account.slice(2)}`
        }) as bigint;

        const gasPrice = await publicClient!.getGasPrice()

        return estimation * gasPrice;

    } catch (error) {
        console.error("estimateSend Error:", error)
    }
    return 83889n * 20n;

}

export { formatEther };



export async function contractCallFeeestimate(
    fromChainName: string,
    toChainName: string,
    functionName: string,
    amount: string,
    tokenName: string,
    account: string
): Promise<string> {

    try {

        const selectedChain = ALL_CHAINS[chainNameToKey<TAllChainNames>(fromChainName)];

        const contractAddress: string = selectedChain.bridge;

        const chainId = allChainNameToIndex[toChainName];
        console.log("chainId", chainId)

        const provider = window!.ethereum!;

        const accounts: string[] = await provider!.request(
            {
                method: 'eth_accounts'
            });
        const selectedAddress: string = accounts[0];
        console.log("selectedAddress", selectedAddress, "accounts", accounts)

        const nonce = await provider!.request({
            method: 'eth_getTransactionCount',
            params: [selectedAddress, 'latest']
        });
        console.log("account nonce", nonce)

        const functionArgs = [
            BigInt(amount),
            chainId,
            tokenName,
            account
        ];

        const encodedParameters = encodeFunctionData({
            abi: FTBridge, functionName, args: [functionArgs]
        });
        console.log("encodedParameters", encodedParameters)

        const transaction = {
            from: selectedAddress,
            to: contractAddress,
            data: `0x${encodedParameters.slice(2)}`,
            nonce: nonce,
        };
        console.log("transaction", transaction)

        const gasEstimate: bigint = await provider.request({
            method: 'eth_estimateGas',
            params: [transaction]
        }) as bigint;

        const gasPriceWei: bigint = await provider.request({
            method: 'eth_gasPrice'
        });

        return (gasEstimate * gasPriceWei).toString();
    } catch (error) {
        console.error("contractCallFeeestimate Error:", error);
    }

    return functionName === 'sendInstallment' ? (83889n * 11n).toString() : (22868n * 11n).toString();

}


export function convertToBigIntWithScaling(value: number, scalingFactor: number = 10 ** 18): bigint {
    const result = Math.round(value * scalingFactor)
    return BigInt(result);
}


export async function config(chainName: TChainName) {

    const key = chainNameToKey<TAllChainNames>(chainName);
    console.log("key", key)

    const chain = ALL_CHAINS[key];
    console.log("chain", chain);

    const [account] = await window?.ethereum!.request({ method: 'eth_requestAccounts' }) as string[];

    const publicClient = createPublicClient({
        chain,
        transport: http(chain.rpcUrls.default.http[0])
    });
    console.log("publicClient", publicClient)

    const signer = createWalletClient({
        account:`0x${account.slice(2)}`,
        chain,
        transport: custom(window?.ethereum!)
    });
    console.log("signer", signer)

    // JSON-RPC Account
    // const [account] = await signer.getAddresses();
    // console.log("account", account)

    return {
        account,
        chain,
        publicClient,
        signer
    }

}


/**
 * @dev Approves the bridge to spend the `amount` of ERC20
 * @param chainName the chain name where to approve
 * @param tokenName the token symbol
 * @param amount the token quantity x decimals
 * @returns the hash of the transaction
 */
export async function approveERC20(
    chainName: TChainName,
    tokenName: string,
    amount: string,
) {

    console.log("Started config")
    const {
        account,
        chain,
        publicClient,
        signer
    } = await config(chainName);
    console.log("Done config")

    const tokenContract: SupportedTokenType = testnetTokens[
        tokenName
            .toLocaleUpperCase() as keyof typeof testnetTokens
    ];

    console.log("tokenContract", tokenContract)

    const args: [string, string] = [
        chain.bridge,
        amount
    ];
    console.log("args", args)

    const tokenContractAddress: string = tokenContract.address[
        chainName
            .toLocaleLowerCase()
            .replace(/[^a-z]/g, '') // remove spaces, etc.
    ];
    console.log("tokenContractAddress", tokenContractAddress)

    const { request } = await publicClient.simulateContract({
        address: `0x${tokenContractAddress.slice(2)}`,
        abi: tokenContract.abi,
        functionName: 'approve',
        args,
        account:`0x${account.slice(2)}`,
        chain,
    });
    console.log("request", request)

    return await signer.writeContract(request);

}


/**
 * Calls the sendInstallment function of the bridge contract
 * @param fromChain the name of the chain of departure
 * @param toChainName the name of the chain of destination
 * @param tokenName the token symbol
 * @param amount the token quantity x decimals
 * @param receiver the beneficiary address
 * @returns the transaction hash
 */
export async function transferERC20(
    fromChain: TChainName,
    toChainName: TChainName,
    tokenName: string,
    amount: string,
    receiver: string
): Promise<string> {

    const {
        account,
        chain,
        publicClient,
        signer
    } = await config(fromChain);

    const chainId: number = BridgeChainIds[toChainName.toLocaleLowerCase().replace(/[^a-zA-Z]/g, '') as keyof typeof BridgeChainIds]

    const bridgeAddress: string = chain.bridge;

    const args: [[bigint, number, string, string]] = [[
        BigInt(amount),
        chainId,
        tokenName.toUpperCase(),
        receiver
    ]];

    const { request } = await publicClient.simulateContract({
        address: `0x${bridgeAddress.slice(2)}`,
        abi: FTBridge,
        functionName: 'sendInstallment',
        args,
        account:`0x${account.slice(2)}`,
        chain,
    });

    return await signer.writeContract(request);

}


/**
 * Fetches the transaction from a chain
 * @param chainName where the TX took place
 * @param hash the TX hash
 * @returns JSONified Transaction Receipt
 */
export async function getTransaction(
    chainName: TChainName,
    hash: `0x${string}`
) {
    const { publicClient } = await config(chainName);

    return await publicClient.waitForTransactionReceipt({ hash })
}


export const BridgeChainIds = {
    goerly: 1,
    bsctestnet: 2,
    mumbai:3,
    sparknet:4
}