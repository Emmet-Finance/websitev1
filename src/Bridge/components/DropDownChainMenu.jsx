import React from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAppSelector } from '../state/store';
import ListItem from './ListItem';
import {
    setFromChain,
    setToChain,
} from '../state/chains'

import DownArrow from '../../assets/img/chevron-down.svg';
import { filterOneOut } from '../utils'

function DropDownChainMenu(props) {

    const dispatch = useDispatch();
    const chains = useAppSelector((state) => state.chains);

    const onChainClickHandler = (e, chain, logo) => {
        e.preventDefault()
        if (props.direction === "from") {
            dispatch(setFromChain(chain))
        } else if (props.direction === "to") {
            dispatch(setToChain(chain))
        }
    }

    return (
        <div className="originNetwork">
            <label htmlFor="">{props.name}</label>
            <Dropdown className='bridgeDrop'>
                <Dropdown.Toggle id="logoDropdown">
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

                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {filterOneOut(chains.supportedChains, props.direction === "from"
                        ? chains.fromChain
                        : chains.toChain)
                        .map(chain =>
                            <ListItem
                                href="#"
                                key={chain.name}
                                name={chain.name}
                                logo={chain.logo}
                                onClick={(e) => onChainClickHandler(e, chain.name, chain.logo)}
                            />
                        )}
                </Dropdown.Menu>
            </Dropdown>
            <img src={DownArrow} alt="DownArrow" className="selectArrow" />
        </div>
    )

}

export default DropDownChainMenu;