import { ethers } from "ethers";
import { getProvider } from "./getProvider";

export async function getSigner(address:string): Promise<ethers.providers.JsonRpcSigner> {
    // const account = await getAccount();
    // console.log("getSigner", account)
    // const address = await getAddress();
    // console.log("getSigner address", address)
    const provider = await getProvider();
    console.log("getSigner provider", provider)
    const signer = provider.getSigner(address);
    console.log('getSigner', signer);
    return signer;
}