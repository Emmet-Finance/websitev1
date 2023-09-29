// External imports
import React from 'react';
import { useDispatch } from 'react-redux';
import { bigIntToHuman, chainNameToKey } from 'emmet.sdk'
// SVGs
import CopySmall from '../../assets/img/new/copy2.svg';
import Metamask from '../../assets/img/new/Metamask.svg';
import Close from '../../assets/img/new/close.svg';
// Local imports
import HashLink from './HashLink';
import { copyAddressToClipboard } from '../utils';
import { useAppSelector } from '../state/store';
import TransferProgress from './TransferProgress';
import { setIsBridgeFormVisible } from '../state/ui'

function TransactionDetails() {

    const dispatch = useDispatch();
    const wallets = useAppSelector(state => state.wallets);
    const chains = useAppSelector(state => state.chains);
    const tokens = useAppSelector(state => state.tokens);
    const transaction = useAppSelector(state => state.transaction);

    const fromExplorer = chains.supportedChains[chainNameToKey(chains.fromChain)].blockExplorers.default.url;
    const toExplorer = chains.supportedChains[chainNameToKey(chains.toChain)].blockExplorers.default.url;

    function onClickHandle() {
        dispatch(setIsBridgeFormVisible())
    }

    return (
        <>
            <div className="transactionDetails">
                <div className="EmmetBridge_title">
                    <h2>Emmet.Bridge</h2>
                </div>
                <div className="detailsTitle">
                    <span className="text_art">
                        Transaction
                    </span>
                    Details
                </div>
                <div className="transtionAre">
                    <div className="transactionContainer">
                        <label htmlFor="">From</label>
                        <ul className="transaction_box">
                            <li>
                                <div className="leftText">
                                    <div
                                        className='Logo'
                                        dangerouslySetInnerHTML={{ __html: chains.fromChainLogo }}>
                                    </div>
                                    {chains.fromChain}
                                </div>
                                <div className="rightText">
                                    {transaction.transferAmount
                                        ? `- ${bigIntToHuman(transaction.transferAmount)} ${tokens.fromTokens}`
                                        : ''}
                                    <img src={Metamask} alt="Metamask" />
                                </div>
                            </li>
                            <li>
                                <div className="leftText">
                                    TX Hash:
                                </div>
                                <div className="rightText">
                                    {transaction
                                        && fromExplorer
                                        && transaction.originalHash
                                        && <HashLink
                                            explorer={fromExplorer}
                                            extension="/tx/"
                                            hash={transaction.originalHash}
                                            linkText={`${transaction.originalHash.slice(0, 10)}...${transaction.originalHash.slice(60, 66)}`}
                                        />}
                                    <button
                                        className='copyAddress'
                                        type='button'
                                        onClick={() => copyAddressToClipboard(transaction.originalHash)}
                                    >
                                        <img src={CopySmall} alt="CopySmall" />
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div className="leftText">
                                    Sender:
                                </div>
                                <div className="rightText">
                                    {wallets
                                        && wallets.account
                                        && <HashLink
                                            explorer={fromExplorer}
                                            extension={"/address/"}
                                            hash={wallets.account}
                                            linkText={`${wallets.account.slice(0, 10)}...${wallets.account.slice(36, 42)}`}
                                        />}
                                    <button
                                        className='copyAddress'
                                        type='button'
                                        onClick={() => copyAddressToClipboard(wallets.account)}
                                    >
                                        <img src={CopySmall} alt="CopySmall" />
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="transactionContainer">
                        <label htmlFor="">To</label>
                        <ul className="transaction_box">
                            <li>
                                <div className="leftText">
                                    <div
                                        className='Logo'
                                        dangerouslySetInnerHTML={{ __html: chains.toChainLogo }}>
                                    </div>
                                    {chains.toChain}
                                </div>
                                <div className="rightText">
                                    {transaction.receiveAmount
                                        ? `+ ${bigIntToHuman(transaction.receiveAmount)} ${tokens.toTokens}`
                                        : ''}
                                    <img src={Metamask} alt="Metamask" />
                                </div>
                            </li>
                            {/* <li>
                                <div className="leftText">
                                    TX Hash:
                                </div>
                                <div className="rightText">
                                    {transaction
                                        && transaction.destinationHash
                                        && <HashLink
                                            explorer={toExplorer}
                                            extension={"/tx/"}
                                            hash={transaction.destinationHash}
                                            linkText={`${transaction.destinationHash.slice(0, 10)}...${transaction.destinationHash.slice(60, 66)}`}
                                        />
                                    }
                                    <button
                                        className='copyAddress'
                                        type='button'
                                        onClick={() => copyAddressToClipboard(transaction.destinationHash)}
                                    >
                                        <img src={CopySmall} alt="CopySmall" />
                                    </button>
                                </div>
                            </li> */}
                            <li>
                                <div className="leftText">
                                    Receiver:
                                </div>
                                <div className="rightText">
                                    {
                                        transaction
                                        && toExplorer
                                        && transaction.destinationAddress
                                        && <HashLink
                                            explorer={toExplorer}
                                            extension={"/address/"}
                                            hash={transaction.destinationAddress}
                                            linkText={`${transaction.destinationAddress.slice(0, 10)}...${transaction.destinationAddress.slice(36, 42)}`}
                                        />
                                    }
                                    <button
                                        className='copyAddress'
                                        type='button'
                                        onClick={() => copyAddressToClipboard(transaction.destinationAddress)}
                                    >
                                        <img src={CopySmall} alt="CopySmall" />
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                PROGRESS:
                <TransferProgress />
                <div
                    className="transtionBtn text-center"
                    onClick={onClickHandle}
                >
                    <a
                        href="/bridge"
                        className='cancelBtn enterApp'
                    >
                        Close
                        <img src={Close} alt="Close" />
                    </a>
                </div>
            </div>
        </>
    );
}

export default TransactionDetails;