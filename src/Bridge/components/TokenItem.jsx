// External imports
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { bigIntToHuman, metamaskAddToken } from 'emmet.sdk';
// SVGs
import CopySmall from '../../assets/img/new/copy2.svg';
import Metamask from '../../assets/img/new/Metamask.svg';
import Star from '../../assets/img/new/star.svg';
// Local Imports
import { copyAddressToClipboard } from '../utils';
import { useAppSelector } from '../state/store';
import { getTokenImage } from '../wallets/supportedTokens';


function TokenItem(props) {

    const chains = useAppSelector((state) => state.chains);
    const [formattedChain, setFormattedChain] = useState(chains.fromChain);

    useEffect(() => {
        setFormattedChain(chains.fromChain.toLowerCase().replace(/[^0-9a-z]/g, ''))
    }, [chains.fromChain])

    const onCopyContractClick = () => {
        copyAddressToClipboard(props.contract[formattedChain])
    }

    const onAddTokenToMetamaskClick = () => {

        const address = props.contract[formattedChain];
        const symbol = props.name;
        const decimals = props.decimals;
        const image = getTokenImage(props.name);

        metamaskAddToken(
            address,
            symbol,
            decimals,
            image
        );
    }

    return (
        <div onClick={props.onClick}>
            <Dropdown.Item href={props.href}>
                <div className='flexBox'>
                    {props
                        && props.logo
                        && <div
                            className='Logo'
                            dangerouslySetInnerHTML={{ __html: props.logo }}>
                        </div>}
                    <div
                        className='Caption'>
                        {props.name}
                    </div>
                </div>
                {props.direction === "from"
                    ? <p className='tokkenValue'>
                        <span>{props.name}:</span>
                        {props.balance ? bigIntToHuman(props.balance) : '0.00'}
                    </p>
                    : ''}
                <div className="hoverIcons">
                    {/* 1. Copies the token contract address to the clipboard */}
                    {props.contract && formattedChain && props.contract[formattedChain]
                        ? (<button
                            onClick={onCopyContractClick}
                            type='button'
                            className='copyLink'>
                            <img src={CopySmall} alt="CopySmall" />
                        </button>)
                        : ''
                    }

                    {/* 2. Adds the token contract to Metamask */}
                    {props.contract && formattedChain && props.contract[formattedChain]
                        ? (<button
                            onClick={onAddTokenToMetamaskClick}
                            type='button'
                            className='copyLink'><img src={Metamask} alt="Metamask" />
                        </button>)
                        : ''}

                    {/* 3. Makes the token favourite */}
                    <button
                        type='button'
                        className='copyLink'>
                        <img src={Star} alt="Star" />
                    </button>
                </div>
            </Dropdown.Item>
        </div>
    )

}

export default TokenItem;