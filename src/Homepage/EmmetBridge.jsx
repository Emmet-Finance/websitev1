import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import EmmetLogo from '../assets/img/logo-2.svg';
import DownArrow from '../assets/img/chevron-down.svg';
import UpDownCirlce from '../assets/img/up-down-circle.svg';
import LinkLogo from '../assets/img/link.svg';
import Binance from '../assets/img/coin-logo/Binance_logo.svg';
import Ethereum from '../assets/img/coin-logo/ethereum-eth-logo.svg';
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
                        <label htmlFor="">Token</label>
                        <select name="FromToken" id="FromToken">
                            <option value="BUSD">USDT</option>
                        </select>
                        <img src={DownArrow} alt="DownArrow" className="selectArrow" />
                    </div>
                    <div className="originNetwork">
                        <label htmlFor="">Origin Network</label>
                        <Dropdown>
                            <Dropdown.Toggle id="logoDropdown">
                                <img src={Binance} alt="Binance" className='coinLogo' />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#"><img src={Binance} alt="Binance" className='coinLogo' /></Dropdown.Item>
                                <Dropdown.Item href="#"><img src={Ethereum} alt="Binance" className='coinLogo' /></Dropdown.Item>
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
                        <select name="FromToken" id="FromToken">
                            <option value="BUSD">BUSD</option>
                        </select>
                        <img src={DownArrow} alt="DownArrow" className="selectArrow" />
                    </div>
                    <div className="originNetwork">
                        <label htmlFor="">Destination Network</label>
                        <Dropdown>
                            <Dropdown.Toggle id="logoDropdown">
                                <Dropdown.Item href="#"><img src={Binance} alt="Binance" className='coinLogo' /></Dropdown.Item>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#"><img src={Binance} alt="Binance" className='coinLogo' /></Dropdown.Item>
                                <Dropdown.Item href="#"><img src={Ethereum} alt="Binance" className='coinLogo' /></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
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
                    <h4>Destination Account</h4>
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