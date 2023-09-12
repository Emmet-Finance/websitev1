import { EVMChain } from "emmet.sdk";
import { getSelectedChain } from "./getSelectedChain";

export function getBridgeAddress(chainName: string): string {
    const chain: EVMChain = getSelectedChain(chainName);
    return chain.bridge;
}