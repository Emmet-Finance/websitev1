import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAppSelector } from '../state/store';
import TokenItem from './TokenItem';

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

    const dispatch = useDispatch();
    const tokens = useAppSelector((state) => state.tokens);

    return (
        <div className="emmetTokken">
            <label htmlFor="">{props.name}</label>
            <Dropdown className='tokkenDrop'>
                <Dropdown.Toggle id="">
                    <div className='flexBox'>
                        {tokens && tokens.fromTokensLogo && <div className='Logo' dangerouslySetInnerHTML={{ __html: tokens.fromTokensLogo }}></div>}
                        <div className='Caption'>{tokens.fromTokens}</div>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <div className="dropSearch">
                        <form action="#">
                            <button type='button'> <img src={Search} alt="Search" /> </button>
                            <input type="search" placeholder='Search' name='Search' id='Search' />
                        </form>
                    </div>
                    {Object.keys(tokens.supportedTokens).map(key =>
                        <TokenItem
                            href="#"
                            logo={tokens.supportedTokens[key].logo}
                            name={key}
                        />
                    )}
                </Dropdown.Menu>
            </Dropdown>
            <img src={DownArrow} alt="DownArrow" className="selectArrow" />
        </div>)
}

export default DropDownTokenMenu;