import { ALL_CHAINS, formatChainName, EVMChain } from "emmet.sdk";
import { detectEthereumProvider } from './detectEthereumProvider'

/**
 * Switches or adds a new chain to the wallet
 * @param chainName a new chain name
 * @param newChain a new chain
 */
export async function switchEvmChain(chainName: string) {

    // Format the chain name to mathc the keys
    const formattedName = formatChainName(chainName) as keyof typeof ALL_CHAINS;
    // Extract the required chain
    const newChain: EVMChain = ALL_CHAINS[formattedName];
    // Extract the chain Id & convert to 0x-prefixed hexadecimal
    const chainId: string = `0x${newChain.id.toString(16)}`
    // Inject Ethereum Provider
    const ethereum: any = await detectEthereumProvider();

    try {
        // Try switching the chain
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }],
        });

    } catch (switchError: any) {
        // If the chain does not exist let's add it
        if (switchError && switchError.code === 4902) {

            try {
                // Try adding a new chain to the wallet
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: newChain.id,
                            chainName: newChain.name,
                            rpcUrls: newChain.rpcUrls,
                        },
                    ],
                });
            } catch (addError: any) {

                if (addError.code === 4001) {
                    console.error("User rejected chain addition.");
                } else {
                    // Unexpected error, let's see it
                    console.error("Failed to add new chain:", addError);
                }
            }
        }
    }
}