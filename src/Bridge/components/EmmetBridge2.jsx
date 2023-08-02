import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

import UpDownCirlce from '../../assets/img/up-down-circle.svg';
import LinkLogo from '../../assets/img/link.svg';
import CopyBridge from '../../assets/img/new/copy.svg';
import Check from '../../assets/img/new/check.svg';
import Info from '../../assets/img/new/info.svg';

import MaxNumberSet from './MaxNumberSet';
import SlippageTolerance from './SlippageToleranceModal';
import TransactionDetails from './TransactionDetails';

import DropDownTokenMenu from './DropDownTokenMenue';
import DropDownChainMenu from './DropDownChainMenu';

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
                    <h2>Emmet.Bridge</h2>
                    <button className='copyBridge'><img src={CopyBridge} alt="CopyBridge" /></button>
                </div>
                <div className="emmetFromTo">
                    <p>From</p>
                    <div className="emmetFrom emmetFromtop">
                        <DropDownTokenMenu
                            direction="from"
                            name="Token"
                        />
                        <DropDownChainMenu
                            direction="from"
                            name="Network of Origin"
                        />
                    </div>
                    <img src={UpDownCirlce} alt="UpDownCirlce" className="updownCircle" />
                    <p>To</p>
                    <div className="emmetFrom">
                        <DropDownTokenMenu 
                            direction="to"
                            name="Token"
                        />
                        <DropDownChainMenu
                            direction="to"
                            name="Destination Network"
                        />
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
                            <div className="label label1 infoLabel">
                                <span>Target Address</span>
                                <div className="inofText">
                                    <img src={Info} alt="Info" />
                                    <span> <b>Warning:</b> Not to loose the transfered tokens, make sure the destination address is correct. </span>
                                </div>
                            </div>
                        </div>
                        <div className="emmetFrom amountMax">
                            <input type="text" placeholder="Paste Here"  /> 
                            <p>SELF</p>
                        </div>       
                        <p className="warningText">
                            <span className='warningTextItem warningText1'>Not enough gas. <b>0.005 BNB</b> required. </span>
                            <span className='warningTextItem warningText2'>Insufficient balance. </span>
                            <span className='warningTextItem warningText3'>Insufficient approval. </span>
                        </p>
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
                            <span className='color-green'>Success!</span>
                        </p>
                        <p className="viewHash">DAI 100.00 <a href="/bridge">View Hash</a></p>
                    </div>
                    <div className="dualBtns">
                        <div className='approveBtn' onClick={handleButtonClick} >APPROVE <img src={Check} alt="Check"/></div>
                        <div className='disenable enterApp'>TRANSFER <img src={LinkLogo} alt="Arrow"/></div>
                    </div>
                </div>
            </div>
            }
            {isOtherElementVisible && <TransactionDetails/>}
        </>
    );
}

export default EmmetBridge2;