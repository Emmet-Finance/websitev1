


export function getMetamaskProvider() {

    let ethereum = (window as any).ethereum;

    let _tempEthereum: any;
    if (ethereum.providerMap) {
        for (const record of ethereum.providerMap) {
            if (record[0] === 'MetaMask') {
                _tempEthereum = record[1]
            }
        }
    }

    if (_tempEthereum) { ethereum = _tempEthereum }

    return ethereum;
}