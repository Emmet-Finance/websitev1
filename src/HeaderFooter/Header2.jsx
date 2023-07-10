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
import Earth from '../assets/img/new/earth.svg';
import Goerli from '../assets/img/new/Goerli.svg';
import Polygon from '../assets/img/new/Polygon.svg';

import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';

function Header2() {
  return (
    <Navbar className='header2' expand="lg">
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
        </Navbar.Collapse>

        <div className="mobileMenu">
            <Dropdown className='mobileDropdown languageDrop'>
                <Dropdown.Toggle id="languageDrop">
                    <img src={Earth} alt="Earth" className="EarthIcon" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#">English</Dropdown.Item>
                    <Dropdown.Item href="#">French</Dropdown.Item>
                    <Dropdown.Item href="#">German</Dropdown.Item>
                    <Dropdown.Item href="#">Russian</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className='mobileDropdown coinDrop'>
                <Dropdown.Toggle id="coin_Drop">
                    <img src={Binance} alt="Binance" className="BinanceIcon" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#"><span className="iconColor Goerli"><img src={Goerli} alt="Goerli" className='' /></span> Goerli</Dropdown.Item>
                    <Dropdown.Item href="#"><span className="iconColor TBSC"><img src={Binance} alt="TBSC" className='' /></span> TBSC</Dropdown.Item>
                    <Dropdown.Item href="#"><span className="iconColor Polygon"><img src={Polygon} alt="Polygon" className='Polygon' /></span> Polygon</Dropdown.Item>
                    <Dropdown.Item href="#"><span className="iconColor Goerli"><img src={Goerli} alt="SparkNet" className='Goerli' /></span> SparkNet</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>

        <Dropdown className='enterAppDropdown'>
            <Dropdown.Toggle className='enterApp' id="dropdown-enterApp">
              CONNECT <span>WALLET</span> <img src={Down} alt="Down" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#"><img src={Metamask} alt="Metamask" /> Metamask</Dropdown.Item>
              <Dropdown.Item href="#"><img src={Binance} alt="Binance" /> Binance</Dropdown.Item>
              <Dropdown.Item className='active' href="#"><img src={Trust} alt="Trust" /> Trust</Dropdown.Item>
              <Dropdown.Item href="#"><img src={Coinbase} alt="Coinbase" /> Coinbase</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

      </Container>
    </Navbar>
  );
}

export default Header2;
