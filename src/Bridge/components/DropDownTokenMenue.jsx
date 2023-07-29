import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import DownArrow from '../../assets/img/chevron-down.svg';
import Usdt from '../../assets/img/tether-usdt-logo.svg';
import BinanceIcon from '../../assets/img/new/Binance.svg';
import Search from '../../assets/img/new/search.svg';
import Tether from '../../assets/img/new/Tether.svg';
import CopySmall from '../../assets/img/new/copy2.svg';
import Metamask from '../../assets/img/new/Metamask.svg';
import Star from '../../assets/img/new/star.svg';
import DAI from '../../assets/img/new/DAI.svg';

function DropDownTokenMenu(props) {
    return (
        <div className="emmetTokken">
            <label htmlFor="">{props.name}</label>
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
        </div>)
}

export default DropDownTokenMenu;