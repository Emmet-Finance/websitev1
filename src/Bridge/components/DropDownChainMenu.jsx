import React from 'react';
// import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAppSelector } from '../state/store';
import ListItem from './ListItem';

import DownArrow from '../../assets/img/chevron-down.svg';

function DropDownChainMenu(props) {

    // const dispatch = useDispatch();
    const chains = useAppSelector((state) => state.chains);

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
                    {chains.supportedChains.map(chain =>
                        <ListItem
                            href="#"
                            key={chain.name}
                            name={chain.name}
                            logo={chain.logo}
                        />
                    )}
                </Dropdown.Menu>
            </Dropdown>
            <img src={DownArrow} alt="DownArrow" className="selectArrow" />
        </div>
    )

}

export default DropDownChainMenu;