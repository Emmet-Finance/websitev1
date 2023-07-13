import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

// import EmmetLogo from '../assets/img/logo-2.svg';
import DownArrow from '../assets/img/chevron-down.svg';
import UpDownCirlce from '../assets/img/up-down-circle.svg';
import LinkLogo from '../assets/img/link.svg';
import Binance from '../assets/img/coin-logo/Binance_logo.svg';
import Ethereum from '../assets/img/coin-logo/ethereum-eth-logo.svg';
import Busd from '../assets/img/binance-usd-busd-logo.svg';
import Usdt from '../assets/img/tether-usdt-logo.svg';
import CopyBridge from '../assets/img/new/copy.svg';
import Goerli from '../assets/img/new/Goerli.svg';
import BinanceIcon from '../assets/img/new/Binance.svg';
import Polygon from '../assets/img/new/Polygon.svg';
import SparkNet from '../assets/img/new/Goerli.svg';
import Search from '../assets/img/new/search.svg';
import Tether from '../assets/img/new/Tether.svg';
import CopySmall from '../assets/img/new/copy2.svg';
import Metamask from '../assets/img/new/Metamask.svg';
import Star from '../assets/img/new/star.svg';
import Starg from '../assets/img/new/starg.svg';
import DAI from '../assets/img/new/DAI.svg';
import Check from '../assets/img/new/check.svg';
import Info from '../assets/img/new/info.svg';
import Routing from '../assets/img/new/routing.svg';
import Close from '../assets/img/new/close.svg';

import MaxNumberSet from './MaxNumberSet';
import ProgressBar from 'react-bootstrap/ProgressBar';
import SlippageTolerance from './SlippageToleranceModal';



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
                <div className="transtionBtn text-center"><a href="" className='cancelBtn enterApp'>CANCEL <img src={Close} alt="Close" /></a></div>
            </div>
        </>
    );
}

export default TransactionDetails;