// import { ethers } from 'ethers';
// import { chainNameToKey } from '../utils';
// import { 
//     ALL_CHAINS, 
//     EVMChain, 
//     SupportedTokenType,
//     TChainName,
//     testnetTokens,
// } from 'emmet.sdk';
// import FTBridge from 'emmet.sdk/abi/FTBridge';
// import { detectEthereumProvider } from './detectEthereumProvider'
import { getMetamaskProvider } from './getMetamaskProvider'

export async function getAccount(): Promise<string> {
    const ethereum = getMetamaskProvider();
    const [account] = await ethereum
        .request({ method: 'eth_requestAccounts' }) as string[];
    return account;
}




// export async function estimateSend(
//     fromChain: string, 
//     toChain:string,
//     tokenName:string
// ){
//     console.log('ethers estimateSend')
//     const bridgeContract = await getBridgeContract(fromChain, );
//     console.log('bridgeContract', bridgeContract)
//     const chainId = allChainNameToIndex[toChain];
//     console.log('chainId', chainId)
//     const account: string = await getAddress();
//     console.log('account', account)
//     const gas = await bridgeContract.estimateGas.sendInstallment(
//         [
//             "1000000000000000000", // amount
//             chainId,
//             tokenName,
//             account
//         ]
//     );
//     console.log('gas', gas)
// }

// export async function estimateReceive(
//     toChain: string,
//     fromChain:string,
//     tokenName: string
// ){
//     const bridgeContract = await getBridgeContract(toChain);
//     // For estimation we use the MAX uint256
//     const actionId: bigint = 2n ** 256n - 1n;

//     const unhashed = `${toChain}-${fromChain}-${actionId.toString()}`
//     const txHash = ethers.utils.keccak256(
//         Buffer.from(unhashed, 'hex')
//     )
//     const chainId = allChainNameToIndex[fromChain];
//     const account: string = await getAddress();
//     return await bridgeContract.estimateGas.receiveInstallment(
//         txHash,
//         [
//             "1000000000000000000", // amount
//             chainId,
//             tokenName,
//             account
//         ]
//     )
// }








