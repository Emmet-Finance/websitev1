import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Bridge from '../assets/img/new/Bridge.svg';
import Trade from '../assets/img/new/Trade.svg';
import Stake from '../assets/img/new/Stake.svg';
import Farrm from '../assets/img/new/Farrm.svg';
import More from '../assets/img/new/More.svg';

function MobileFooterNav() {
    return ( 
        <div className="mobileFooter">
            <div className="container">
                <div className="mobileNavContainer">
                    <a href="#" className='mobileFooterLink'><img src={Bridge} alt="Bridge" /> Bridge</a>
                    <a href="#" className='mobileFooterLink'><img src={Trade} alt="Trade" /> Trade</a>
                    <a href="#" className='mobileFooterLink'><img src={Stake} alt="Stake" /> Stake</a>
                    <a href="#" className='mobileFooterLink'><img src={Farrm} alt="Farrm" /> Farrm</a>

                    <Dropdown className='moreDrop'>
                        <Dropdown.Toggle variant="success" id="moreDrop-menu">
                            <img src={More} alt="More" className='moreIcon' /> More
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#">Farm</Dropdown.Item>
                            <Dropdown.Item href="#">Lend</Dropdown.Item>
                            <Dropdown.Item href="#">Liquidity</Dropdown.Item>
                            <Dropdown.Item href="#">Validate</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
     );
}

export default MobileFooterNav;