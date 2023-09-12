import { PublicClient, createPublicClient, custom, http } from "viem";
import { EVMChain, TChainName } from "emmet.sdk";
import { isEvmAddress } from "emmet.sdk/utils/verifiers";

/**
 * Creates a signer or a provider
 * @param address of a user
 * @param chainName the connected chain name
 * @param blockchains an array of supported chains
 * @param isSigner a flag wheather can sign & write
 * @param url custom RPC uri
 * @returns 
 */
export function getPublicClient(
    address: string,
    chainName: TChainName,
    blockchains: EVMChain[],
    provider:any,
    isSigner: boolean = false,
    url: string = '',
): PublicClient | undefined {
    if (isEvmAddress(address)) {
        const selectedChain = blockchains.filter(net =>
            net.name === chainName)[0];

        return createPublicClient({
            chain: selectedChain,
            transport: isSigner ? custom(provider) : http(url),
        });
    }
    return undefined;
}