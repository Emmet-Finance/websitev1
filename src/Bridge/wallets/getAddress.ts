import { getProvider } from "./getProvider";

export async function getAddress(): Promise<string> {
    const provider = await getProvider();
    const [address] = await provider.listAccounts();
    console.log("getAddress", address)
    return address;
}