import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useWeb3Modal } from '@web3modal/react'
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Local imports
import ListItem from './ListItem';
// UI logos
import Down from '../../assets/img/new/down.svg';
import Logo from '../../assets/img/logo.svg';
// import Earth from '../../assets/img/new/earth.svg';
import { useAppSelector, useAppDispatch } from '../state/store';
import { setWallet } from '../state/wallets';
import { supportedWallets, WalletLogos } from '../types';
import { shortenAddress } from '../utils';
import { setFromChain } from '../state/chains';
import { connectWallet } from '../state/wallets';

function BridgeHeader() {

  const dispatch = useDispatch();
  const asyncDispatch = useAppDispatch();

  const { open } = useWeb3Modal();

  const chains = useAppSelector((state) => state.chains);
  const wallets = useAppSelector((state) => state.wallets);
  const state = useAppSelector(state => state);

  const handleConnect = async () => {
    try {
      await asyncDispatch(setFromChain(chains.fromChain));
      await asyncDispatch(connectWallet(chains.fromChain));
    } catch (error) {
      console.error("BridgeHeader:handleConnect: ERROR:", error)
    }
  }

  const onWalletClickHandler = (wallet) => {

    dispatch(setWallet(wallet));

    switch (wallet) {
      case 'Metamask':
        handleConnect();
        break;
      case 'Wallet Connect':
        open();
        break;
      default:
        break;
    }

  }

  useEffect(() => {
    console.log("state", state)
  }, [state])


  return (
    <Navbar className='BridgeHeader' expand="lg">
      <Container>

        <Navbar.Brand href="https://emmet.finance"><img src={Logo} alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="emmetNav" />

        <Navbar.Collapse id="emmetNav">
          <Nav className="ms-auto me-auto">
            <Nav.Link href="/" title="Home Page">HOME</Nav.Link>
            <Nav.Link href="#" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank">SWAP</Nav.Link>
            <Nav.Link href="#" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank">STAKE</Nav.Link>
            <Nav.Link href="#" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank">FARM</Nav.Link>
            <Nav.Link href="#" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank">LEND</Nav.Link>
            <Nav.Link href="#" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank">VALIDATE</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className="mobileMenu">
          {/* <Dropdown className='mobileDropdown languageDrop'>
            <Dropdown.Toggle id="languageDrop">
              <img src={Earth} alt="Earth" className="EarthIcon" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {supportedLanguages.map(language =>
                <ListItem
                  href="#"
                  key={language}
                  name={language}
                />)}
            </Dropdown.Menu>
          </Dropdown> */}
        </div>

        <Dropdown className='enterAppDropdown'>
          <Dropdown.Toggle className='enterApp' id="dropdown-enterApp">
            <span>
              {wallets && wallets.account
                ? shortenAddress(wallets.account)
                : "CONNECT WALLET"
              }
            </span>
            <img src={Down} alt="Down" />
          </Dropdown.Toggle>
          <Dropdown.Menu style={{width:"290px"}}>
            {supportedWallets.map(wallet =>
              <ListItem
                onClick={() => onWalletClickHandler(wallet)}
                href="#"
                key={wallet}
                logo={WalletLogos[wallet.replace(/[^a-zA-Z0-9]/g, '')]}
                name={wallet}
                disabled={wallet !== 'Metamask' && wallet !== 'Wallet Connect'}
              />
            )}
          </Dropdown.Menu>
        </Dropdown>

      </Container>
    </Navbar>
  );
}

export default BridgeHeader;
