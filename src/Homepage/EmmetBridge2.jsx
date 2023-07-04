import React, { useState } from 'react';
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
import TransactionDetails from './TransactionDetails';



function EmmetBridge2() {
    const [isElementVisible, setIsElementVisible] = useState(true);
    const [isOtherElementVisible, setIsOtherElementVisible] = useState(false);
  
    const handleButtonClick = () => {
      setIsElementVisible(false);
      setIsOtherElementVisible(true);
    };

    const now = 100;
    
    return (
        <>
            {isElementVisible &&
            <div className="EmmetBridge_Box">
                <div className="EmmetBridge_title">
                    <h2>Bridge</h2>
                    <button className='copyBridge'><img src={CopyBridge} alt="CopyBridge" /></button>
                </div>
                <div className="emmetFromTo">
                    <p>From</p>
                    <div className="emmetFrom emmetFromtop">
                        <div className="emmetTokken">
                            <label htmlFor="">Token</label>
                            <Dropdown className='tokkenDrop'>
                                <Dropdown.Toggle id="">
                                    <img src={Usdt} alt="Binance" className='coinLogo' /> USDT
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <div className="dropSearch">
                                        <form action="#">
                                            <button type='button'> <img src={Search} alt="Search" /> </button>
                                            <input type="search" placeholder='Search' name='Search' id='Search' />
                                        </form>
                                    </div>
                                    <Dropdown.Item href="#">
                                        <p className='tokenIconTit'><img src={Tether} alt="Tether" /> USDT</p>
                                        <p className='tokkenValue'><span>Tether:</span> 1,257.00</p>
                                        <div className="hoverIcons">
                                            <button type='button' className='copyLink'><img src={CopySmall} alt="CopySmall" /></button>
                                            <button type='button' className='copyLink'><img src={Metamask} alt="Metamask" /></button>
                                            <button type='button' className='copyLink'><img src={Star} alt="Star" /></button>
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        <p className='tokenIconTit'><img src={DAI} alt="DAI" /> DAI</p>
                                        <p className='tokkenValue'><span>DAI:</span> 121,256</p>
                                        <div className="hoverIcons">
                                            <button type='button' className='copyLink'><img src={CopySmall} alt="CopySmall" /></button>
                                            <button type='button' className='copyLink'><img src={Metamask} alt="Metamask" /></button>
                                            <button type='button' className='copyLink'><img src={Star} alt="Star" /></button>
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        <p className='tokenIconTit'><img src={BinanceIcon} alt="BinanceIcon" /> BUSD</p>
                                        <p className='tokkenValue'><span>Binance USD:</span> 87.09</p>
                                        <div className="hoverIcons">
                                            <button type='button' className='copyLink'><img src={CopySmall} alt="CopySmall" /></button>
                                            <button type='button' className='copyLink'><img src={Metamask} alt="Metamask" /></button>
                                            <button type='button' className='copyLink'><img src={Star} alt="Star" /></button>
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <img src={DownArrow} alt="DownArrow" className="selectArrow" />
                        </div>
                        <div className="originNetwork">
                            <label htmlFor="">Origin Network</label>
                            <Dropdown className='bridgeDrop'>
                                <Dropdown.Toggle id="logoDropdown">
                                    <img src={Ethereum} alt="Binance" className='coinLogo' />
                                    ETH
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#"> <img src={Goerli} alt="Goerli" /> Goerli</Dropdown.Item>
                                    <Dropdown.Item href="#"> <img src={BinanceIcon} alt="Goerli" /> TBSC</Dropdown.Item>
                                    <Dropdown.Item href="#"> <img src={Polygon} alt="Goerli" /> Polygon</Dropdown.Item>
                                    <Dropdown.Item href="#"> <img src={SparkNet} alt="Goerli" /> SparkNet</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <img src={DownArrow} alt="DownArrow" className="selectArrow" />
                        </div>
                    </div>
                    <img src={UpDownCirlce} alt="UpDownCirlce" className="updownCircle" />
                    <p>To</p>
                    <div className="emmetFrom">
                        <div className="emmetTokken">
                            <label htmlFor="">Token</label>
                            <Dropdown className='tokkenDrop'>
                                <Dropdown.Toggle id="">
                                    <img src={Busd} alt="Binance" className='coinLogo' /> BUSD
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <div className="dropSearch">
                                        <form action="#">
                                            <button type='button'> <img src={Search} alt="Search" /> </button>
                                            <input type="search" placeholder='Search' name='Search' id='Search' />
                                        </form>
                                    </div>
                                    <Dropdown.Item href="#">
                                        <p className='tokenIconTit'><img src={Tether} alt="Tether" /> USDT</p>
                                        <p className='tokkenValue'><span>Tether:</span> 1,257.00</p>
                                        <div className="hoverIcons">
                                            <button type='button' className='copyLink'><img src={CopySmall} alt="CopySmall" /></button>
                                            <button type='button' className='copyLink'><img src={Metamask} alt="Metamask" /></button>
                                            <button type='button' className='copyLink'><img src={Star} alt="Star" /></button>
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        <p className='tokenIconTit'><img src={DAI} alt="DAI" /> DAI</p>
                                        <p className='tokkenValue'><span>DAI:</span> 121,256</p>
                                        <div className="hoverIcons">
                                            <button type='button' className='copyLink'><img src={CopySmall} alt="CopySmall" /></button>
                                            <button type='button' className='copyLink'><img src={Metamask} alt="Metamask" /></button>
                                            <button type='button' className='copyLink'><img src={Star} alt="Star" /></button>
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#">
                                        <p className='tokenIconTit'><img src={BinanceIcon} alt="BinanceIcon" /> BUSD</p>
                                        <p className='tokkenValue'><span>Binance USD:</span> 87.09</p>
                                        <div className="hoverIcons">
                                            <button type='button' className='copyLink'><img src={CopySmall} alt="CopySmall" /></button>
                                            <button type='button' className='copyLink'><img src={Metamask} alt="Metamask" /></button>
                                            <button type='button' className='copyLink'><img src={Star} alt="Star" /></button>
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <img src={DownArrow} alt="DownArrow" className="selectArrow" />
                        </div>
                        <div className="originNetwork">
                            <label htmlFor="">Destination Network</label>
                            <Dropdown className='bridgeDrop'>
                                <Dropdown.Toggle id="logoDropdown">
                                    <img src={Binance} alt="Binance" className='coinLogo' />
                                    BSC
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#"> <img src={Goerli} alt="Goerli" /> Goerli</Dropdown.Item>
                                    <Dropdown.Item href="#"> <img src={BinanceIcon} alt="Goerli" /> TBSC</Dropdown.Item>
                                    <Dropdown.Item href="#"> <img src={Polygon} alt="Goerli" /> Polygon</Dropdown.Item>
                                    <Dropdown.Item href="#"> <img src={SparkNet} alt="Goerli" /> SparkNet</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <img src={DownArrow} alt="DownArrow" className="selectArrow" />
                        </div>
                    </div>
                    <div className="lineBox">
                        <div className='labelText'>
                            <p className="label label1">Amount to Transfer</p>
                            <p className="label label2"><span>Balance:</span> 2200.00 USDT</p>
                        </div>
                        <div className="emmetFrom amountMax">
                            {/* <input type="number" placeholder="2000" min="1" max="2000" />  */}
                            <MaxNumberSet /> <p>MAX</p>
                        </div>
                    </div>
                    <div className="lineBox">
                        <div className='labelText'>
                            <p className="label label1">Amount to Receive</p>
                        </div>
                        <div className="emmetFrom amountMax">
                            <input type="number" placeholder="" value="1968"/> 
                        </div>
                    </div>
                    <div className="lineBox">
                        <div className='labelText'>
                            <p className="label label1 infoLabel">
                                <span>Target Address</span>
                                <div className="inofText">
                                    <img src={Info} alt="Info" />
                                    <span> <b>Warning:</b> Do not use exchange addresses or contact addresses. You may lose your tokens. </span>
                                </div>
                            </p>
                        </div>
                        <div className="emmetFrom amountMax">
                            <input type="text" placeholder="Paste Here"  /> 
                            <p>SELF</p>
                        </div>
                        <p className="warningText">Not enough gas. <b>0.005 BNB</b> needed. </p>
                    </div>
                    <div className="bridgeCalculation">
                        <div className="calculateBox">
                            <span>Allowance:</span>
                            1,256.00 DAI
                        </div>
                        <div className="calculateBox">
                            <span>Gas Fee:</span>
                            0.001 BNB
                        </div>
                        <div className="calculateBox">
                            <span>Slippage:</span>
                            0.5%  <SlippageTolerance/>
                        </div>
                    </div>
                    <div className="approvingLoading">
                        Approving
                        <ProgressBar  striped variant="success" now={now} label={`${now}%`} visuallyHidden />
                    </div>
                    <div className="approveBox">
                        <p className='approveText'>
                            Approval: 
                            <span className='color-red'>Failed!</span>
                            <span className='color-green'>Failed!</span>
                        </p>
                        <p className="viewHash">DAI 100.00 <a href="#">View Hash</a></p>
                    </div>
                    <div className="dualBtns">
                        <a href="javascript:void(0)" className='approveBtn' onClick={handleButtonClick} >APPROVE <img src={Check} alt="Check" /></a>
                        <a href="https://emmet.finance" className='disenable enterApp'>TRANSFER <img src={LinkLogo} alt="LinkLogo" /></a>
                    </div>
                </div>
            </div>
            }
            {isOtherElementVisible && <TransactionDetails/>}
        </>
    );
}

export default EmmetBridge2;