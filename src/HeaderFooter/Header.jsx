import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../assets/img/logo.svg';
import LinkLogo from '../assets/img/link.svg';
import React from 'react';


function Header() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home"><img src={Logo} alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="emmetNav" />
        <Navbar.Collapse id="emmetNav">
          <Nav className="ms-auto me-auto">
            <Nav.Link href="#link" title="Coming Soon" onClick={event => event.preventDefault()} onClick={() => { alert('Coming Soon'); return false; }} target="_blank">BRIDGE</Nav.Link>
            <Nav.Link href="#link" title="Coming Soon" onClick={event => event.preventDefault()} onClick={() => { alert('Coming Soon'); return false; }} target="_blank">TRADE</Nav.Link>
            <Nav.Link href="#link" title="Coming Soon" onClick={event => event.preventDefault()} onClick={() => { alert('Coming Soon'); return false; }} target="_blank">STAKE</Nav.Link>
            <Nav.Link href="#link" title="Coming Soon" onClick={event => event.preventDefault()} onClick={() => { alert('Coming Soon'); return false; }} target="_blank">FARM</Nav.Link>
            <Nav.Link href="#link" title="Coming Soon" onClick={event => event.preventDefault()} onClick={() => { alert('Coming Soon'); return false; }} target="_blank">LEND</Nav.Link>
            <Nav.Link href="#link" title="Coming Soon" onClick={event => event.preventDefault()} onClick={() => { alert('Coming Soon'); return false; }} target="_blank">VALIDATE</Nav.Link>
          </Nav>
          <a href="#" className='enterApp'>Enter app <img src={LinkLogo} alt="LinkLogo" /></a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;