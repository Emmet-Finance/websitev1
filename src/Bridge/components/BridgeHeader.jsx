import React from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  detectEthereumProvider,
  estimateReceive,
  // estimateSend,
  getEvmAccounts,
  getEvmBalance,
  getEvmChainId,
  getEvmTokenAllowances,
  getEvmTokenBalances,
  switchEvmChain,
} from 'emmet.sdk';
// Local imports
import ListItem from './ListItem';
// UI logos
import Down from '../../assets/img/new/down.svg';
import Logo from '../../assets/img/logo.svg';
// import Earth from '../../assets/img/new/earth.svg';
import { useAppSelector } from '../state/store';
import {
  setFromTokenBalances,
  setFromTokenAllowances
} from '../state/tokens';
import {
  setWallet,
  setAccounts,
  setBalance,
  setChainId,
} from '../state/wallets';
import {
  // supportedLanguages,
  supportedWallets,
  WalletLogos
} from '../types';
import {
  setDestinationFee,
  setNativeFee,
} from '../state/transactions';
import { shortenAddress } from '../utils';
import { formatEther, contractCallFeeestimate } from '../wallets/EVM'

function BridgeHeader() {

  const dispatch = useDispatch();
  const chains = useAppSelector((state) => state.chains);
  const wallets = useAppSelector((state) => state.wallets);
  const tokens = useAppSelector((state) => state.tokens);

  const handleConnect = async () => {

    try {

      // Get the info about the browser wallet
      const provider = await detectEthereumProvider({ silent: true });

      if (provider && typeof window.ethereum !== 'undefined') {

        // If the selected chain is different from the one in the wallet
        if (chains.chainId !== provider.networkVersion) {
          
          switchEvmChain(chains.fromChain);
        }

        // Inject the wallet account
        let accounts = [];
        accounts = await getEvmAccounts();
        dispatch(setAccounts(accounts));
        // Inject the native coin balance
        dispatch(setBalance(await getEvmBalance(accounts[0])));
        dispatch(setChainId(await getEvmChainId()));
        // Collect the token balances of the account
        const fromBalances = await getEvmTokenBalances(accounts[0], chains.fromChain);
        console.log("fromBalances", fromBalances)
        dispatch(setFromTokenBalances(fromBalances));
        // Collect the token allowances of the account
        const alowances = await getEvmTokenAllowances(accounts[0], chains.fromChain);
        console.log('alowances', alowances)
        dispatch(setFromTokenAllowances(alowances));

        // Native fee
        // const nativeFee = await estimateSend(
        //   "100000000000000000",
        //   accounts[0],
        //   chains.fromChain,
        //   chains.toChain,
        //   tokens.fromTokens
        // );
        // console.log("nativeFee", formatEther(nativeFee/100000n));

        // const estNative = await estimateSend(
        //   chains.fromChain,
        //   chains.toChain,
        //   tokens.fromTokens
        // );
        // console.log("new estNative", estNative)

        const nativePureEstimate = await contractCallFeeestimate(
          chains.fromChain,
          chains.toChain,
          'sendInstallment',
          "100000000000000000",
          tokens.fromTokens,
          accounts[0]
        );

        console.log("nativePureEstimate", formatEther(nativePureEstimate));
        if (chains.fromChain === 'Goerli' || chains.fromChain === 'Mumbai' || 'Athens3') {
          dispatch(setNativeFee(formatEther(nativePureEstimate * 100000)));
        }
        dispatch(setNativeFee(formatEther(nativePureEstimate)));


        // Destination fee
        const destFee = await estimateReceive(
          "100000000000000000",
          accounts[0],
          accounts[0],
          chains.toChain,
          chains.fromChain,
          tokens.fromTokens
        );
        console.log("destFee", destFee);
        dispatch(setDestinationFee((destFee).toString()));
      }

    } catch (error) {
      console.error("BridgeHeader:handleConnect: ERROR:", error)
    }


  }

  const onWalletClickHandler = (wallet) => {
    dispatch(setWallet(wallet));
    handleConnect();
  }

  return (
    <Navbar className='BridgeHeader' expand="lg">
      <Container>

        <Navbar.Brand href="https://emmet.finance"><img src={Logo} alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="emmetNav" />

        <Navbar.Collapse id="emmetNav">
          <Nav className="ms-auto me-auto">
            <Nav.Link href="/" title="Home Page">HOME</Nav.Link>
            <Nav.Link href="#" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank">TRADE</Nav.Link>
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
                : "CONNECT A WALLET"
              }
            </span>
            <img src={Down} alt="Down" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {supportedWallets.map(wallet =>
              <ListItem
                onClick={() => onWalletClickHandler(wallet)}
                href="#"
                key={wallet}
                logo={WalletLogos[wallet]}
                name={wallet}
                disabled={wallet !== 'Metamask'}
              />
            )}
          </Dropdown.Menu>
        </Dropdown>

      </Container>
    </Navbar>
  );
}

export default BridgeHeader;
