// React & UI related
import React from 'react';
import ScrollToTop from 'react-scroll-to-top';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Web3Modal related
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';

// Chains
import { ALL_CHAINS } from 'emmet.sdk';

// Styles
import './App.css';
import './responsive.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Local imports
import Form from './Homepage/Form';
import Homepage from './Homepage/Homepage';
import PrivacyPolicy from './Homepage/PrivacyPolicy';
import EmmetBridgepage from './Bridge/components/EmmetBridgepage';

// import { CoinBase, MetaMask, TrustWallet } from './Bridge/wallets/supportedWallets'

const supportedChains = Object.values(ALL_CHAINS);
const projectId = '2bcf20e00bc0f72513e22cd16ce9ae83';

const { publicClient } = configureChains(supportedChains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains: supportedChains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, supportedChains)

function App() {
  

  return (
    <div className="App">
      <WagmiConfig config={wagmiConfig}>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/form" element={<Form />} />
            <Route path="/bridge" element={<EmmetBridgepage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
          <ScrollToTop smooth color="#35CE8D" />
        </Router>
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </div >
  );
}

export default App;
