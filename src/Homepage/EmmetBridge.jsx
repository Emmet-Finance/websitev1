import React from 'react';
import EmmetLogo from '../assets/img/logo-2.svg';
import DownArrow from '../assets/img/chevron-down.svg';
import UpDownCirlce from '../assets/img/up-down-circle.svg';
import LinkLogo from '../assets/img/link.svg';

function EmmetBridge() {
    return ( 
        <div className="EmmetBridge_Box">
            <div className="EmmetBridge_title">
                <img src={EmmetLogo} alt="EmmetLogo" /> 
            </div>
            <div className="emmetFromTo">
                <p>From</p>
                <div className="emmetFrom">
                    <div className="emmetTokken">
                        <label htmlFor="">Tokken</label>
                        <select name="FromTokken" id="FromTokken">
                            <option value="usdt">USDT</option>
                            <option value="usdt">USDT</option>
                        </select>
                        <img src={DownArrow} alt="DownArrow" className="selectArrow" />
                    </div>
                    <div className="originNetwork">
                        <label htmlFor="">Origin Network</label>
                        <select name="FromTokken" id="FromTokken">
                            <option value="BINANCE">BINANCE</option>
                            <option value="BINANCE">BINANCE</option>
                        </select>
                        <img src={DownArrow} alt="DownArrow" className="selectArrow" />
                    </div>
                </div>
                <img src={UpDownCirlce} alt="UpDownCirlce" className="updownCircle" />
                <p>To</p>
                <div className="emmetFrom">
                    <div className="emmetTokken">
                        <label htmlFor="">Tokken</label>
                        <select name="FromTokken" id="FromTokken">
                            <option value="usdt">USDT</option>
                            <option value="usdt">USDT</option>
                        </select>
                        <img src={DownArrow} alt="DownArrow" className="selectArrow" />
                    </div>
                    <div className="originNetwork">
                        <label htmlFor="">Origin Network</label>
                        <select name="FromTokken" id="FromTokken">
                            <option value="BINANCE">BINANCE</option>
                            <option value="BINANCE">BINANCE</option>
                        </select>
                        <img src={DownArrow} alt="DownArrow" className="selectArrow" />
                    </div>
                </div>
                <br />
                <p>Amount</p>
                <div className="emmetFrom amountMax">
                    <input type="number" placeholder="2000" /> <p>MAX</p>
                </div>
                <br />
                <div className="toAccount">
                    <p>To Account</p>
                    <ul>
                        <li>
                            <span>Slippage</span>
                            <span>5%</span>
                        </li>
                        <li>
                            <span>LOCAL TX FEE</span>
                            <span>0.001 BNB</span>
                        </li>
                        <li>
                            <span>DESTINATION TX FEE</span>
                            <span>0.001 ETH</span>
                        </li>
                    </ul>
                    <a href="#" className='enterApp'>cONNECT WALLET <img src={LinkLogo} alt="LinkLogo" /></a>
                </div>
            </div>
        </div>
     );
}

export default EmmetBridge;
