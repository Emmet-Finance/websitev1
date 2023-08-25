import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { bnToHumanReadable } from '../utils';

import CopySmall from '../../assets/img/new/copy2.svg';
import Metamask from '../../assets/img/new/Metamask.svg';
import Star from '../../assets/img/new/star.svg';

function TokenItem(props) {

    return (
        <div onClick={props.onClick}>
            <Dropdown.Item href={props.href}>
                <div className='flexBox'>
                    {props && props.logo && <div className='Logo' dangerouslySetInnerHTML={{ __html: props.logo }}></div>}
                    <div className='Caption'>{props.name}</div>
                </div>
                {props.direction === "from"
                    ? <p className='tokkenValue'>
                        <span>{props.name}:</span> {props.balance ? bnToHumanReadable(props.balance) : '0.00'}
                    </p>
                    : ''}
                <div className="hoverIcons">
                    <button type='button' className='copyLink'><img src={CopySmall} alt="CopySmall" /></button>
                    <button type='button' className='copyLink'><img src={Metamask} alt="Metamask" /></button>
                    <button type='button' className='copyLink'><img src={Star} alt="Star" /></button>
                </div>
            </Dropdown.Item>
        </div>
    )

}

export default TokenItem;