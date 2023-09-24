import { EthereumProvider } from "emmet.sdk";
import EtherConstants from 'emmet.sdk/wallets/EthreumConstants';
import { isMobile } from 'mobile-device-detect';

/**
 * Checks an EthereumProvider availability
 * @param mustBeMetaMask flag whether isMetamask
 * @param timeout milliseconds to await, default 4000 (4 sec)
 * @returns null | EthereumProvider
 */
export function detectEthereumProvider<T = EthereumProvider>(
    mustBeMetaMask = false,
    timeout = 4000
): Promise<T | null> {

    let handled = false;

    let ethereum: any;
    
    // If on mobile browser:
    if(window && isMobile && !(window as any).ethereum){

        // Get the current url
        let temp:string = window.location.href;
        // Build a metamask deep link
        const metamaskDeepLink = `https://metamask.app.link/dapp/${temp}`;
        // Open Metamask
        window.open(metamaskDeepLink)
    } 

    ethereum = (window as any).ethereum;
    
    console.log("detectEthereumProvider:ethereum", ethereum);

    return new Promise(resolve => {

        if (ethereum) {
            handleEthereum();
        } else {
            window?.addEventListener(
                EtherConstants.ETH_INITIALISED,
                handleEthereum,
                { once: true },
            );

            setTimeout(() => {
                handleEthereum();
            }, timeout);
        }

        function handleEthereum() {
            if (handled) {
                return;
            }
            handled = true;

            let _tempEthereum: any;
            if (ethereum.providerMap) {
                for (const record of ethereum.providerMap) {
                    if (record[0] === 'MetaMask') {
                        _tempEthereum = record[1]
                    }
                }
            }
            if (_tempEthereum) { ethereum = _tempEthereum }

            window?.removeEventListener(EtherConstants.ETH_INITIALISED, handleEthereum);

            if (ethereum && (!mustBeMetaMask || ethereum.isMetaMask)) {
                resolve(ethereum as unknown as T)
            } else {

                const message = mustBeMetaMask && ethereum
                    ? 'Non-MetaMask window.ethereum detected.'
                    : 'Unable to detect window.ethereum.';

                console.error(message);
                resolve(null);
            }
        }

    })
}