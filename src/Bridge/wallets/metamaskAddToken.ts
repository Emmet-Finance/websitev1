import { detectEthereumProvider } from "./detectEthereumProvider";

/**
 * Add a custom token to the user's MetaMask wallet.
 *
 * @param address - The Ethereum address where the custom token is deployed.
 * @param symbol - A ticker symbol or shorthand for the custom token, up to 5 characters.
 * @param decimals - The number of decimal places for the custom token. It can be a string or number.
 * @param image - A URL pointing to the token's logo image.
 * @returns A Promise that resolves to the result of the MetaMask request.
 * @throws If an error occurs during the MetaMask request, it will be logged to the console.
 */
export function metamaskAddToken(
    address: string,
    symbol: string,
    decimals: string | number,
    image: string
): void {

    (async () => {

        const provider: any = await detectEthereumProvider();

        // Request MetaMask to add the custom token to the user's wallet
        const result = await provider.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address,
                    symbol,
                    decimals,
                    image
                }
            }
        });

        // Log the result and return it
        console.log("metamaskAddToken:success", result);

    })().catch(e => {
        // Handle any errors that occur during the MetaMask request and log them
        console.error("metamaskAddToken:Error:", e);
    });
}
