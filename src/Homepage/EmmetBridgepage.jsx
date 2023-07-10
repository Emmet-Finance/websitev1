import React from 'react';
import Header2 from '../HeaderFooter/Header2';
import EmmetBridge2 from './EmmetBridge2';
import Footer from '../HeaderFooter/Footer';
import MobileFooterNav from '../HeaderFooter/MobileFooter';



function EmmetBridgepage() {
    return ( 
        <div className="emmentBridgePage">
            <Header2/>
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