import { getMetamaskProvider } from './getMetamaskProvider'

export async function metamaskERC20Transfer(

): Promise<any> {

    const ethereum = getMetamaskProvider();

    if (ethereum) {
        const accounts: string[] = await ethereum.request({ method: 'eth_requestAccounts' });
        
        const result = ethereum.request({
            method: 'eth_sendTransaction',
            // EIP-1559 transaction.
            params: [
                {
                    from: accounts[0], // The user's active address.
                    to: "",
                    value: 0,
                    gasLimit: '0xC350',
                    maxPriorityFeePerGas: '0x3b9aca00',
                    maxFeePerGas: '0x2540be400'
                },
            ]
        });

        result
            .then((txHash:string) => console.log(txHash))
            .catch((error:any) => console.error(error));
    }
}