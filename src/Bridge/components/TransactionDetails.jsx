import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../state/store';
import { copyAddressToClipboard, chainNameToKey } from '../utils';

import CopySmall from '../../assets/img/new/copy2.svg';
import Metamask from '../../assets/img/new/Metamask.svg';
import Close from '../../assets/img/new/close.svg';
import HashLink from './HashLink';

import {setIsBridgeFormVisible} from '../state/ui'

function TransactionDetails() {

    const dispatch = useDispatch();
    const wallets = useAppSelector(state => state.wallets);
    const chains = useAppSelector(state => state.chains);
    const tokens = useAppSelector(state => state.tokens);
    const transaction = useAppSelector(state => state.transaction);

    const fromExplorer = chains.supportedChains[chainNameToKey(chains.fromChain)].blockExplorers.default.url;
    const toExplorer = chains.supportedChains[chainNameToKey(chains.toChain)].blockExplorers.default.url;

    function onClickHandle() {
        console.log("TransactionDetails:onClickHandle")
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
                                    - {transaction.transferAmount}
                                    {" "}
                                    {tokens.fromTokens}
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
                                    + {transaction.transferAmount}
                                    {" "}
                                    {tokens.toTokens}
                                    <img src={Metamask} alt="Metamask" />
                                </div>
                            </li>
                            <li>
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
                            </li>
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
                {/* TODO:
                 <div className="progressLine">
                    <div className="steepLine line1 checked"><span>1</span> <label htmlFor="">Sent</label></div>
                    <div className="steepLine line2 checked"><span>2</span> <label htmlFor="">Confirmed</label></div>
                    <div className="steepLine line3 current"><span>3</span> <label htmlFor="">Routing</label></div>
                    <div className="steepLine line4"><span>4</span> <label htmlFor="">Success</label></div>
                </div> */}
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