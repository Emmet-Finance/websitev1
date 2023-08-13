import { TChainName, allChainNameToIndex, testnets } from "emmet.sdk/types";
import { getPublicClient } from 'emmet.sdk/utils/viem';
import FTBridge from 'emmet.sdk/abi/FTBridge';

import { formatEther, encodeFunctionData } from 'viem';


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

        console.log('amount', amount, 'account', account, 'fromChainName', fromChainName, 'toChainName', toChainName, 'tokenName', tokenName)

        const selectedChain = testnets.filter(net =>
            net.name === fromChainName)[0];

        const publicClient = getPublicClient(account, fromChainName, [selectedChain], true);

        const chainId = allChainNameToIndex[toChainName];

        const populatedArgs: [bigint, number, string, string] = [
            BigInt(amount),
            chainId,
            tokenName,
            account
        ];

        console.log('selectedChain', selectedChain, 'publicClient', publicClient, 'populatedArgs', populatedArgs)

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
    toChainName:string,
    functionName: string,
    amount: string,
    tokenName: string,
    account: string
): Promise<string> {

    try {

        const selectedChain = testnets.filter(net =>
            net.name === fromChainName)[0];

        const contractAddress: string = selectedChain.bridge;

        const chainId = allChainNameToIndex[toChainName];

        const provider = window!.ethereum!;

        const accounts: string[] = await provider!.request(
            { method: 'eth_accounts'
        });
        const selectedAddress: string = accounts[0];

        const nonce = await provider!.request({
            method: 'eth_getTransactionCount',
            params: [selectedAddress, 'latest']
        });

        const functionArgs = [
            BigInt(amount),
            chainId,
            tokenName,
            account
        ];
        console.log("functionArgs:[amount,chainId,tokenName,account]", functionArgs);

        const encodedParameters = encodeFunctionData({
            abi: FTBridge, functionName, args: [functionArgs]
        });

        const transaction = {
            from: selectedAddress,
            to: contractAddress,
            data: `0x${encodedParameters.slice(2)}`,
            nonce: nonce,
        };

        const gasEstimate: bigint = await provider.request({
            method: 'eth_estimateGas', 
            params: [transaction]
        }) as bigint;

        const gasPriceWei: bigint = await provider.request({
            method: 'eth_gasPrice'
          });

          console.log("gasEstimate", gasEstimate.toString(16), "gasPriceWei", gasPriceWei.toString(16))

        return (gasEstimate * gasPriceWei).toString();
    } catch (error) {
        console.error("contractCallFeeestimate Error:", error);
    }

    return functionName === 'sendInstallment' ? (83889n * 11n).toString() : (22868n * 11n).toString();

}