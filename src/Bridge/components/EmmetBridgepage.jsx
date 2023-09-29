
// External imports
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Local imports
import { metamask } from '../utils';
import BridgeHeader from './BridgeHeader';
import EmmetBridge2 from './EmmetBridge2';
import Footer from '../../HeaderFooter/Footer';
import MobileFooterNav from '../../HeaderFooter/MobileFooter';
import { useAppDispatch } from '../state/store'
import { connectWallet } from '../state/wallets'
import { hasCookies, readCookieByKey } from '../utils';
import { setFromChain, setToChain } from '../state/chains';
import { setFromTokens, setToTokens } from '../state/tokens';


function EmmetBridgepage() {

    const dispatch = useDispatch();
    const asyncDispatch = useAppDispatch();

    async function onWindowReload() {

        if (hasCookies) {
            // FROM CHAIN
            const fromChain = readCookieByKey('fromChain');
            if (fromChain) {
                await asyncDispatch(setFromChain(fromChain));
                await asyncDispatch(connectWallet(fromChain));
            }
            // TO CHAIN
            const toChain = readCookieByKey('toChain');
            if (toChain) {
                dispatch(setToChain(toChain));
            }
    
            // FROM TOKENS
            const fromTokens = readCookieByKey('fromTokens');
            if (fromTokens) {
                dispatch(setFromTokens(fromTokens))
            }
    
            // TO TOKENS
            const toTokens = readCookieByKey('toTokens');
            if (toTokens) {
                dispatch(setToTokens(toTokens))
            }
    
        }
    }

    useEffect(() => {

        (async () => {
            await onWindowReload();
        })();

        const handleChainChange = () => {
            (async () => {
                await onWindowReload();
            })();
            window.location.reload();
        };

        window.addEventListener('load', () => {
            onWindowReload(dispatch);
        });

        if (metamask) {
            metamask.on('chainChanged', handleChainChange);
        }

        return () => {
            window.removeEventListener('load', onWindowReload);
        };
    });

    return (
        <div className="emmentBridgePage">
            <BridgeHeader />
            <div className="emmetBridgeContainer">
                <div className="container">
                    <EmmetBridge2 />
                </div>
            </div>
            <div className="mobFooter">
                <MobileFooterNav />
            </div>
            <div className="deskFooter">
                <Footer />
            </div>
        </div>
    );
}

export default EmmetBridgepage;