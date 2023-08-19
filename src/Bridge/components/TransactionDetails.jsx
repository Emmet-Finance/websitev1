import React from 'react';
import { useAppSelector } from '../state/store';
import { copyAddressToClipboard } from '../utils';

import CopySmall from '../../assets/img/new/copy2.svg';
import Metamask from '../../assets/img/new/Metamask.svg';
import Close from '../../assets/img/new/close.svg';

function TransactionDetails() {

    const wallets = useAppSelector(state => state.wallets);
    const chains = useAppSelector(state => state.chains);
    const tokens = useAppSelector(state => state.tokens);
    const transaction = useAppSelector(state => state.transaction);

    return (
        <>
            <div className="transactionDetails">
                <div className="EmmetBridge_title">
                    <h2>Emmet.Bridge</h2>
                </div>
                <div className="detailsTitle"><span className="text_art">Transaction</span> Details</div>
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
                                        && transaction.originalHash
                                        && `${transaction.originalHash.slice(0, 6)}...${transaction.originalHash.slice(60, 64)}`}
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
                                        && `${wallets.account.slice(0, 6)}...${wallets.account.slice(38, 42)}`}
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
                                        && `${transaction.destinationHash.slice(0, 6)}...${transaction.destinationHash.slice(60, 64)}`}
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
                                        && transaction.destinationAddress
                                        && `${transaction.destinationAddress.slice(0,6)}...${transaction.destinationAddress.slice(38,42)}`
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
                <div className="transtionBtn text-center"><a href="/bridge" className='cancelBtn enterApp'>Close <img src={Close} alt="Close" /></a></div>
            </div>
        </>
    );
}

export default TransactionDetails;