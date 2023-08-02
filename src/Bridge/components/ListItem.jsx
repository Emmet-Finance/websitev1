import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function ListItem(props) {

    return (<div onClick={props.onClick}>
        <Dropdown.Item key={props.key} href={props.href}>
            {props && props.logo && <div className='Logo' dangerouslySetInnerHTML={{ __html: props.logo }}></div>}
            <div className='Caption'>{props.name}</div>
        </Dropdown.Item>
    </div>

    )
}

export default ListItem;