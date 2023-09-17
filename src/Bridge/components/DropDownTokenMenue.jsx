import React from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAppSelector } from '../state/store';
import TokenItem from './TokenItem';
import { setFromTokens, setToTokens } from '../state/tokens';

import DownArrow from '../../assets/img/chevron-down.svg';
import Search from '../../assets/img/new/search.svg';

function DropDownTokenMenu(props) {

    const dispatch = useDispatch();
    const tokens = useAppSelector((state) => state.tokens);
    const wallets = useAppSelector((state) => state.wallets);
    let tokenBalances;

    if (wallets.balances && props.direction === 'from') {
        tokenBalances = wallets.balances;
    }

    const onTokenSelectClickHandler = (e, token) => {
        e.preventDefault();
        if (props.direction === 'from') {
            dispatch(setFromTokens(token))
        } else {
            dispatch(setToTokens(token))
        }
    }

    return (
        <Dropdown className='tokkenDrop'>
            <Dropdown.Toggle id="">
                <div className="emmetTokken">
                    <label htmlFor="">{props.name}</label>
                    <div className='flexBox'>
                        {tokens
                            && tokens.fromTokensLogo
                            && <div className='Logo' dangerouslySetInnerHTML={{ __html: tokens.fromTokensLogo }}></div>}
                        <div className='Caption'>{tokens.fromTokens}</div>
                    </div>
                    <img src={DownArrow} alt="DownArrow" className="selectArrow" />
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
                        direction={props.direction}
                        href="#"
                        key={key}
                        logo={tokens.supportedTokens[key].logo}
                        name={key}
                        balance={tokenBalances && tokenBalances[key]}
                        onClick={e => onTokenSelectClickHandler(e, key)}
                    />
                )}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropDownTokenMenu;