import { ethers } from "ethers";
import { detectEthereumProvider } from "./detectEthereumProvider";

export async function getProvider(): Promise<ethers.providers.Web3Provider> {
    const ethereum = await detectEthereumProvider();
    const provider = new ethers.providers.Web3Provider(ethereum as ethers.providers.ExternalProvider);
    return provider;
}