import { getContract as getViemContract, PublicClient } from "viem";

/**
 * Builds a contract handler
 * @param address of the required contract
 * @param abi a JSON-like interface to contract's binary
 * @param publicClient a signer | provider
 * @returns a functional contract handler
 */
export function getContract(
    address: string,
    abi: any,
    publicClient: PublicClient | undefined
) {
    const contract = getViemContract({
        address: `0x${address.slice(2)}`,
        abi,
        publicClient,
    });
    console.log("getContract:", contract)
    return contract;
}