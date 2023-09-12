import { ALL_CHAINS, EVMChain, chainNameToKey } from "emmet.sdk";

export type TAllChainNames = keyof typeof ALL_CHAINS;

export function getSelectedChain(chainName: string): EVMChain {
    return ALL_CHAINS[chainNameToKey<TAllChainNames>(chainName)];
}