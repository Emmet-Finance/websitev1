import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../assets/img/logo.svg';
import LinkLogo from '../assets/img/link.svg';

function Header() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home"><img src={Logo} alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="emmetNav" />
        <Navbar.Collapse id="emmetNav">
          <Nav className="ms-auto me-auto">
            <Nav.Link href="#link">BRIDGE</Nav.Link>
            <Nav.Link href="#link">TRADE</Nav.Link>
            <Nav.Link href="#link">STAKE</Nav.Link>
            <Nav.Link href="#link">FARM</Nav.Link>
            <Nav.Link href="#link">LIQUIDITY</Nav.Link>
            <Nav.Link href="#link">VALIDATE</Nav.Link>
          </Nav>
          <a href="#" className='enterApp'>Enter app <img src={LinkLogo} alt="LinkLogo" /></a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;