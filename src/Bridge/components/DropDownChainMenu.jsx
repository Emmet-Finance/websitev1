import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { formatChainNameMixedCase } from 'emmet.sdk'

// Local imports
import ListItem from './ListItem';
import { filterTwoOut } from '../utils';
import { useAppSelector, useAppDispatch } from '../state/store';
import DownArrow from '../../assets/img/chevron-down.svg';
import { setFromChain, setToChain } from '../state/chains';
import { connectWallet } from '../state/wallets';


function DropDownChainMenu(props) {

    const dispatch = useDispatch();
    const asyncDispatch = useAppDispatch();
    const chains = useAppSelector((state) => state.chains);

    const onChainClickHandler = async (e, chain) => {
        try {
            e.preventDefault()
            const cleaned = formatChainNameMixedCase(chain)
            if (props.direction === "from") {
                dispatch(setFromChain(cleaned));
                
            } else if (props.direction === "to") {
                dispatch(setToChain(cleaned));
            }

        } catch (error) {
            console.error("DropDownChainMenu:onChainClickHandler ERROR:", error)
        }
    }

    useEffect(() => {

        (async () => {
            await asyncDispatch(connectWallet(chains.fromChain));
        })()

    }, [asyncDispatch, chains.fromChain])

    return (

        <Dropdown className='bridgeDrop'>
            <Dropdown.Toggle id="logoDropdown">
                <div className="originNetwork">
                    <label htmlFor="">{props.name}</label>
                    <div className='flexBox'>
                        <div className='Logo'
                            dangerouslySetInnerHTML={{
                                __html: props.direction === "from"
                                    ? chains.fromChainLogo
                                    : chains.toChainLogo
                            }}>
                        </div>
                        <div
                            className='Caption'>{props.direction === "from"
                                ? chains.fromChain
                                : chains.toChain}
                        </div>
                    </div>
                    <img src={DownArrow} alt="DownArrow" className="selectArrow" />
                </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {filterTwoOut(chains.supportedChains, chains.fromChain, chains.toChain)
                    .map(chain =>
                        <ListItem
                            href="#"
                            key={chain.name}
                            name={chain.name}
                            logo={chain.logo}
                            onClick={(e) => onChainClickHandler(e, chain.name)}
                        />
                    )}
            </Dropdown.Menu>
        </Dropdown>

    )

}

export default DropDownChainMenu;