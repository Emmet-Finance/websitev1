import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function ListItem(props) {

    return (<div onClick={props.onClick}>
        <Dropdown.Item disabled={props.disabled} eventKey={props.name} href={props.href}>
            {props && props.logo && <div className='Logo' dangerouslySetInnerHTML={{ __html: props.logo }}></div>}
            <div
                className='Caption ListItemFlex'
                disabled={props.disabled}
            >
                <span className='wallet-name'>{props.name.replace(/\s/g, '') + ' '}</span>
                {props.disabled ? <span className='coming-soon'>Coming soon</span> : '' }
            </div>
        </Dropdown.Item>
    </div>

    )
}

export default ListItem;