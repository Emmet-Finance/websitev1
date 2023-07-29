import React from 'react';
import BridgeHeader from './BridgeHeader';
import EmmetBridge2 from './EmmetBridge2';
import Footer from '../../HeaderFooter/Footer';
import MobileFooterNav from '../../HeaderFooter/MobileFooter';

function EmmetBridgepage() {
    return ( 
        <div className="emmentBridgePage">
            <BridgeHeader/>
            <div className="emmetBridgeContainer">
                <div className="container">
                    <EmmetBridge2/>
                </div>
            </div>
            <div className="mobFooter">
                <MobileFooterNav/>
            </div>
            <div className="deskFooter">
                <Footer/>
            </div>
        </div>
     );
}

export default EmmetBridgepage;