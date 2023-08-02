import React from 'react';

import Goerli from '../../assets/img/new/Goerli.svg';
import Polygon from '../../assets/img/new/Polygon.svg';
import CopySmall from '../../assets/img/new/copy2.svg';
import Metamask from '../../assets/img/new/Metamask.svg';
import Close from '../../assets/img/new/close.svg';

function TransactionDetails() {

    return (
        <>
            <div className="transactionDetails">
                <div className="EmmetBridge_title">
                    <h2>Bridge</h2>
                </div>
                <div className="detailsTitle"><span className="text_art">Transaction</span> Details</div>
                <div className="transtionAre">
                    <div className="transactionContainer">
                        <label htmlFor="">From</label>
                        <ul className="transaction_box">
                            <li>
                                <div className="leftText">
                                    <img src={Goerli} alt="Goerli" /> Goerli
                                </div>
                                <div className="rightText">
                                    -2200.00 USDT <img src={Metamask} alt="Metamask" />
                                </div>
                            </li>
                            <li>
                                <div className="leftText">
                                    TX Hash:
                                </div>
                                <div className="rightText">
                                    0x26bf30611dc5be32ff9d... <button className='copyAddress' type='button'><img src={CopySmall} alt="CopySmall" /></button>
                                </div>
                            </li>
                            <li>
                                <div className="leftText">
                                    From:
                                </div>
                                <div className="rightText">
                                    0x26bf30611dc5be32ff9d... <button className='copyAddress' type='button'><img src={CopySmall} alt="CopySmall" /></button>
                                </div>
                            </li>
                        </ul>   
                    </div>
                    <div className="transactionContainer">
                        <label htmlFor="">From</label>
                        <ul className="transaction_box">
                            <li>
                                <div className="leftText">
                                    <img src={Polygon} alt="Polygon" /> Polygon
                                </div>
                                <div className="rightText">
                                    +0.00 USDT <img src={Metamask} alt="Metamask" />
                                </div>
                            </li>
                            <li>
                                <div className="leftText">
                                    TX Hash:
                                </div>
                                <div className="rightText">
                                    0x26bf30611dc5be32ff9d... <button className='copyAddress' type='button'><img src={CopySmall} alt="CopySmall" /></button>
                                </div>
                            </li>
                            <li>
                                <div className="leftText">
                                    From:
                                </div>
                                <div className="rightText">
                                    0x26bf30611dc5be32ff9d... <button className='copyAddress' type='button'><img src={CopySmall} alt="CopySmall" /></button>
                                </div>
                            </li>
                        </ul>   
                    </div>
                </div>
                <div className="progressLine">
                    <div className="steepLine line1 checked"><span>1</span> <label htmlFor="">Sent</label></div>
                    <div className="steepLine line2 checked"><span>2</span> <label htmlFor="">Confirmed</label></div>
                    <div className="steepLine line3 current"><span>3</span> <label htmlFor="">Routing</label></div>
                    <div className="steepLine line4"><span>4</span> <label htmlFor="">Success</label></div>
                </div>
                <div className="transtionBtn text-center"><a href="/bridge" className='cancelBtn enterApp'>CANCEL <img src={Close} alt="Close" /></a></div>
            </div>
        </>
    );
}

export default TransactionDetails;