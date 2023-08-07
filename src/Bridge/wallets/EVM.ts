import { getContract, createPublicClient, custom } from 'viem'
// import { goerli, bscTestnet, polygonMumbai } from 'viem/chains'
import { testnetTokens, TTestnetTokenNames, TestnetTokenNames, EVMChain } from 'emmet.sdk';
import { testnets } from 'emmet.sdk';

// const sparknet = testnets.filter(chain => {
//     chain.name === "Sparknet"
// });

/**
 * Verifies validity of a potential EVM address
 * @param address a verified string
 * @returns `true` | `false`
 */
export function isEvmAddress(address: string): boolean {
    // Regular expression to match the EVM address format
    // Expected length 42 chars including `0x`
    // Can only contain hex chars 0-9 | a-f | A-F
    const evmAddressRegex = /^0x[a-fA-F0-9]{40}$/;

    // Test the address against the regex and return the result
    return evmAddressRegex.test(address);
}

export type TokenBalanceObject = { [key: string]: string };

/**
 * Loops through Token contracts & extracts user balances
 * @param account checked account
 * @returns an empty or filled `balances` Object
 */
export async function getEvmTokenBalances(
    account: string,
    chainName: string
): Promise<TokenBalanceObject | undefined> {

    let balances: { [key: TTestnetTokenNames | string]: string } = {};

    if (isEvmAddress(account) && chainName) {

        const testnet = testnets.filter(net =>
            net.name === chainName);
        console.log(chainName, testnet)

        const publicClient = createPublicClient({
            chain: testnet[0],
            transport: custom(window?.ethereum!),
        });

        for await (const tokenName of TestnetTokenNames) {
            const token = testnetTokens[tokenName]

            const address: string = token.address[chainName.toLowerCase().replace(' ', '')];

            if(address){

                const contract = getContract({
                    address: `0x${address.slice(2)}`,
                    abi: token.abi,
                    publicClient,
                });
    
                const bal_ = (await contract.read.balanceOf([account])).toString()
                balances[tokenName] = bal_;
            }

        }

        return balances;
    }
}

/**
 * Loops through Token contracts & extracts user allowances
 * @param account checked account
 * @returns an empty or filled `allowances` Object
 */
export async function getEvmTokenAllowances(
    account: string,
    chainName: string
): Promise<TokenBalanceObject | undefined> {

    let allowances: { [key: TTestnetTokenNames | string]: string } = {};

    if (isEvmAddress(account) && chainName) {

        const testnet = testnets.filter(net =>
            net.name === chainName)[0];
        console.log(chainName,testnets, testnet)

        const publicClient = createPublicClient({
            chain: testnet,
            transport: custom(window?.ethereum!),
        });

        for await (const tokenName of TestnetTokenNames) {
            const token = testnetTokens[tokenName]

            const address: string = token.address["goerly"];

            if(address){

                const contract = getContract({
                    address: `0x${address.slice(2)}`,
                    abi: token.abi,
                    publicClient,
                });
    
                const allow_: string = (await contract.read.allowance([account, testnet.bridge.toString()])).toString();
                allowances[tokenName] = allow_;
            }

        }

        return allowances;
    }
}