import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BridgeHeader from './BridgeHeader';
import EmmetBridge2 from './EmmetBridge2';
import Footer from '../../HeaderFooter/Footer';
import MobileFooterNav from '../../HeaderFooter/MobileFooter';
import { hasCookies, readCookieByKey } from '../utils';
import {
    setFromChain,
    setToChain,
} from '../state/chains'
import {
    setFromTokens,
    setToTokens,
} from '../state/tokens'
import { metamask } from '../utils'


function onWindowReload(dispatch) {
    if (hasCookies) {
        // FROM CHAIN
        const fromChain = readCookieByKey('fromChain');
        if(fromChain){
            dispatch(setFromChain(fromChain));
        }
        // TO CHAIN
        const toChain = readCookieByKey('toChain');
        if(toChain){
            dispatch(setToChain(toChain));
        }
        
        // FROM TOKENS
        const fromTokens = readCookieByKey('fromTokens');
        if(fromTokens){
            dispatch(setFromTokens(fromTokens))
        }
        
        // TO TOKENS
        const toTokens = readCookieByKey('toTokens');
        if(toTokens){
            dispatch(setToTokens(toTokens))
        }
        
    }
}

function EmmetBridgepage() {

    const dispatch = useDispatch();

    useEffect(() => {
        onWindowReload(dispatch);

        const handleChainChange = () => {
            onWindowReload(dispatch);
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
    }, []);

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