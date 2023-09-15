import { ethers } from "ethers";
import { getProvider } from "./getProvider";

export async function getSigner(address:string): Promise<ethers.providers.JsonRpcSigner> {
    const provider = await getProvider();
    const signer = provider.getSigner(address);
    return signer;
}