import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/img/logo.svg';
import LinkLogo from '../assets/img/link.svg';

import Metamask from '../assets/img/new/Metamask.svg';
import Binance from '../assets/img/new/Binance.svg';
import Trust from '../assets/img/new/Trust.svg';
import Coinbase from '../assets/img/new/Coinbase.svg';
import Down from '../assets/img/new/down.svg';


import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';

function Header() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="https://emmet.finance"><img src={Logo} alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="emmetNav" />
        <Navbar.Collapse id="emmetNav">
          <Nav className="ms-auto me-auto">
            <Nav.Link href="#" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank">BRIDGE</Nav.Link>
            <Nav.Link href="#" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank">TRADE</Nav.Link>
            <Nav.Link href="#" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank">STAKE</Nav.Link>
            <Nav.Link href="#" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank">FARM</Nav.Link>
            <Nav.Link href="#" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank">LEND</Nav.Link>
            <Nav.Link href="#" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank">VALIDATE</Nav.Link>
          </Nav>

          {/* <button className='enterApp'>Enter app <img src={LinkLogo} alt="LinkLogo" /></button> */}

          <Dropdown className='enterAppDropdown'>
            <Dropdown.Toggle className='enterApp' id="dropdown-enterApp">
              CONNECT WALLET <img src={Down} alt="Down" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#"><img src={Metamask} alt="Metamask" /> Metamask</Dropdown.Item>
              <Dropdown.Item href="#"><img src={Binance} alt="Binance" /> Binance</Dropdown.Item>
              <Dropdown.Item className='active' href="#"><img src={Trust} alt="Trust" /> Trust</Dropdown.Item>
              <Dropdown.Item href="#"><img src={Coinbase} alt="Coinbase" /> Coinbase</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
