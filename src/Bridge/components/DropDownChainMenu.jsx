// External Imports
import React from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { filterTwoOut, formatChainNameMixedCase } from 'emmet.sdk'
// SVGs
import DownArrow from '../../assets/img/chevron-down.svg';
// Local imports
import ListItem from './ListItem';
import { connectWallet } from '../state/wallets';
import { setFromChain, setToChain } from '../state/chains';
import { useAppSelector, useAppDispatch } from '../state/store';

function DropDownChainMenu(props) {

    const dispatch = useDispatch();
    const asyncDispatch = useAppDispatch();
    const chains = useAppSelector((state) => state.chains);

    const onChainClickHandler = (e, chain) => {

        try {

            e.preventDefault()
            const cleaned = formatChainNameMixedCase(chain)
            if (props.direction === "from") {
                (async () => {
                    console.log("DropDownChainMenu:onChainClickHandler:cleaned", cleaned)
                    await asyncDispatch(setFromChain(cleaned));
                    await asyncDispatch(connectWallet(cleaned));
                })().catch(e => {
                    console.error(e)
                })

            } else if (props.direction === "to") {
                dispatch(setToChain(cleaned));
            }

        } catch (error) {
            console.error("DropDownChainMenu:onChainClickHandler ERROR:", error)
        }
    }

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