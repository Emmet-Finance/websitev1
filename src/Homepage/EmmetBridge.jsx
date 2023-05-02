import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import EmmetLogo from '../assets/img/logo-2.svg';
import DownArrow from '../assets/img/chevron-down.svg';
import UpDownCirlce from '../assets/img/up-down-circle.svg';
import LinkLogo from '../assets/img/link.svg';
import Binance from '../assets/img/coin-logo/Binance_logo.svg';
import Ethereum from '../assets/img/coin-logo/ethereum-eth-logo.svg';
import Busd from '../assets/img/binance-usd-busd-logo.svg';
import Usdt from '../assets/img/tether-usdt-logo.svg';
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
                        {/* <select name="FromToken" id="FromToken">
                            <option value="BUSD">USDT</option>
                            <option value="BUSD">BUSD</option>
                        </select>
                         */}
                        <Dropdown>
                            <Dropdown.Toggle id="">
                                <img src={Usdt} alt="Binance" className='coinLogo' /> USDT 
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#">
                                    <img src={Busd} alt="Binance" className='coinLogo' /> BUSD 
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <img src={DownArrow} alt="DownArrow" className="selectArrow" /> */}
                    </div>
                    <div className="originNetwork">
                        <label htmlFor="">Origin Network</label>
                        <Dropdown>
                            <Dropdown.Toggle id="logoDropdown">
                            <img src={Ethereum} alt="Binance" className='coinLogo' />
                             ETH
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#">
                                    <img src={Binance} alt="Binance" className='coinLogo' />
                                     BNB</Dropdown.Item>
                                <Dropdown.Item href="#">
                                    <img src={Ethereum} alt="Binance" className='coinLogo' />
                                     ETH</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <img src={DownArrow} alt="DownArrow" className="selectArrow" /> */}
                    </div>
                </div>
                <img src={UpDownCirlce} alt="UpDownCirlce" className="updownCircle" />
                <p>To</p>
                <div className="emmetFrom">
                    <div className="emmetTokken">
                        <label htmlFor="">Token</label>
                        {/* <select name="FromToken" id="FromToken">
                            <option value="BUSD">BUSD</option>
                            <option value="BUSD">USDT</option>
                        </select> */}
                        <Dropdown>
                            <Dropdown.Toggle id="">
                                <img src={Busd} alt="Binance" className='coinLogo' /> BUSD 
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#">
                                <img src={Usdt} alt="Binance" className='coinLogo' /> USDT 
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <img src={DownArrow} alt="DownArrow" className="selectArrow" /> */}
                    </div>
                    <div className="originNetwork">
                        <label htmlFor="">Destination Network</label>
                        <Dropdown>
                            <Dropdown.Toggle id="logoDropdown">
                                <img src={Binance} alt="Binance" className='coinLogo' />
                                 BNB
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#">
                                    <img src={Binance} alt="Binance" className='coinLogo' />
                                     BNB</Dropdown.Item>
                                <Dropdown.Item href="#">
                                    <img src={Ethereum} alt="Binance" className='coinLogo' />
                                     ETH</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <img src={DownArrow} alt="DownArrow" className="selectArrow" /> */}
                    </div>
                </div>
                <span className='amountHeight'></span>
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
                            <span>SLIPPAGE</span>
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