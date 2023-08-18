import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useDispatch } from 'react-redux';

import UpDownCirlce from '../../assets/img/up-down-circle.svg';
import LinkLogo from '../../assets/img/link.svg';
import CopyBridge from '../../assets/img/new/copy.svg';
import Check from '../../assets/img/new/check.svg';
import Info from '../../assets/img/new/info.svg';

import SlippageTolerance from './SlippageToleranceModal';
import TransactionDetails from './TransactionDetails';

import DropDownTokenMenu from './DropDownTokenMenue';
import DropDownChainMenu from './DropDownChainMenu';
import { useAppSelector } from '../state/store';
import { copyAddressToClipboard } from '../utils';
import {
    setFromChain,
    setToChain,
} from '../state/chains'
import { bnToHumanReadable, isGreaterOrEqual } from '../utils';
import { disconnect } from '../state/wallets';

import {
    convertToBigIntWithScaling,
} from '../wallets/EVM';
import { isEvmAddress } from 'emmet.sdk';

import { setDestinationAccount, setTransactionName } from '../state/transactions'

function EmmetBridge2() {

    const dispatch = useDispatch();
    const wallets = useAppSelector(state => state.wallets);
    const chains = useAppSelector(state => state.chains);
    const tokens = useAppSelector(state => state.tokens);
    const transaction = useAppSelector(state => state.transaction);

    const [isElementVisible, setIsElementVisible] = useState(true);
    const [isOtherElementVisible, setIsOtherElementVisible] = useState(false);

    const [amount, setAmount] = useState('');
    const [receiver, setReceiver] = useState('');
    const [recieved, setReceived] = useState('');
    const [errorMessage, setError] = useState('');

    const handleApproveClick = () => {
        console.log("Approve");
        setIsElementVisible(false);
        setIsOtherElementVisible(true);
        dispatch(setTransactionName("Approving:"));
    };

    const handleTransferClick = () => {
        console.log("Transfer");
        dispatch(setTransactionName("Transferring:"));
    }

    const now = 100;

    const onCopyButtonClickHandle = () => {
        if (wallets && wallets.account) {
            copyAddressToClipboard(wallets.account)
        } else {
            console.log("no account to copy")
        }
    }

    const onSwapChainsClickHandle = (e) => {
        const fromChain = chains.fromChain;
        const toChain = chains.toChain;
        dispatch(disconnect());
        dispatch(setFromChain(toChain))
        dispatch(setToChain(fromChain))
    }

    const onMaxClickHandle = (e) => {
        e.preventDefault()
        setAmount(tokens.fromTokenBalances[tokens.fromTokens.toUpperCase()])
    }

    const onSelfClickHandler = (e) => {
        e.preventDefault()
        setReceiver(wallets.account)
    }

    const handleAmountChange = (e) => {
        e.preventDefault()

        const b = tokens.fromTokenBalances[tokens.fromTokens.toUpperCase()];
        const a = parseFloat(e.target.value);
        if (a) {
            const aToDec = convertToBigIntWithScaling(a);

            // Check whether balance (b) is > than transfer amount (aToDec)
            if (isGreaterOrEqual(b, aToDec)) {
                setAmount(a);
                const slippage = a * transaction.slippage / 100;
                const _received = a - slippage
                setReceived(_received);
                setError('');
            } else {
                setError(`Balance is not enough for this transaction`)
            }
        } else {
            setAmount('');
            setReceived('');
        }

    }

    const handleReceivedOnChange = (e) => {
        e.preventDefault();
        const _received = parseFloat(e.target.value);
        const _amount = (_received / transaction.slippage / 100) + _received
        setReceived(_received);
        setAmount(_amount);
    }

    const handleDestAddressChange = (e) => {
        e.preventDefault();
        const inputValue = e.target.value;
        const pattern = /^[0x]{0,2}[0-9a-fA-F]{0,40}$/;

        if (pattern.test(inputValue)) {
            setReceiver(inputValue);
            if (isEvmAddress(inputValue)) {
                dispatch(setDestinationAccount(inputValue))
            }
        }
    }

    return (
        <>
            {isElementVisible &&
                <div className="EmmetBridge_Box">
                    <div className="EmmetBridge_title">
                        <h2>Emmet.Bridge</h2>
                        <button
                            className='copyBridge'
                            title="Copy the address"
                            onClick={onCopyButtonClickHandle}
                        >
                            <img src={CopyBridge} alt="CopyBridge" />
                        </button>
                    </div>
                    <div className="emmetFromTo">
                        <p>From</p>
                        <div className="emmetFrom emmetFromtop">
                            <DropDownTokenMenu
                                direction="from"
                                name="Token"
                            />
                            <DropDownChainMenu
                                direction="from"
                                name="Network of Origin"
                            />
                        </div>
                        <img
                            src={UpDownCirlce}
                            alt="UpDownCirlce"
                            className="updownCircle"
                            onClick={(e) => onSwapChainsClickHandle(e)}
                            title='Swap chains'
                        />
                        <p>To</p>
                        <div className="emmetFrom">
                            <DropDownTokenMenu
                                direction="to"
                                name="Token"
                            />
                            <DropDownChainMenu
                                direction="to"
                                name="Destination Network"
                            />
                        </div>
                        <div className="lineBox">
                            <div className='labelText'>
                                <p className="label label1">Amount to Transfer</p>
                                <p className="label label2">
                                    <span>Balance:</span>
                                    {tokens && tokens.fromTokenBalances
                                        ? ' '
                                        + bnToHumanReadable(tokens
                                            .fromTokenBalances[tokens.fromTokens.toUpperCase()])
                                        + ` ${tokens.fromTokens}`
                                        : " 0.00 " + tokens.fromTokens}
                                </p>
                            </div>
                            <div className="emmetFrom amountMax">
                                <input
                                    type="number"
                                    placeholder="To be sent"
                                    value={amount ? amount : ''}
                                    onChange={handleAmountChange}
                                />
                                <p
                                    onClick={e => onMaxClickHandle(e)}
                                    className='max-button'
                                >MAX</p>
                            </div>
                        </div>
                        <div className="lineBox">
                            <div className='labelText'>
                                <p className="label label1">Amount to Receive</p>
                            </div>
                            <div className="emmetFrom amountMax">
                                <input
                                    type="text"
                                    placeholder="To be received"
                                    value={recieved ? recieved : ''}
                                    onChange={handleReceivedOnChange}
                                />
                            </div>
                        </div>
                        <div className="lineBox">
                            <div className='labelText'>
                                <span className="label label1 infoLabel">
                                    <span><p className='inline'>Target Address</p></span>
                                    <span className="inofText m-l-5">
                                        <img src={Info} alt="Info" />
                                        <span> <b>Warning:</b> Not to loose the transfered tokens, make sure the destination address is correct. </span>
                                    </span>
                                </span>
                            </div>
                            <div className="emmetFrom amountMax">
                                <input
                                    type="text"
                                    placeholder="Receiver's Address"
                                    value={receiver}
                                    onChange={handleDestAddressChange}
                                />
                                <p
                                    onClick={e => onSelfClickHandler(e)}
                                    className='max-button'
                                >SELF</p>
                            </div>
                            {/* *************** Error Block *************** */}
                            <p className="warningText">
                                <span className='warningTextItem warningText2'>
                                    {errorMessage ? errorMessage : ''}
                                </span>
                            </p>
                        </div>
                        {/* *************** Informational Block *************** */}
                        <div className="bridgeCalculation">
                            <div className="calculateBox">
                                <span>Allowance:</span>
                                {tokens.tokenAllowances
                                    ? `${bnToHumanReadable(tokens.tokenAllowances[tokens.fromTokens.toUpperCase()])} ${tokens.fromTokens}`
                                    : '0.00'
                                }
                            </div>
                            <div className="calculateBox">
                                <span>Gas Fee:</span>
                                {bnToHumanReadable((transaction.nativeFee + transaction.destinationFee), 18, 6)}
                                {chains.nativeCurrency}
                            </div>
                            <div className="calculateBox">
                                <span>Slippage:</span>
                                {transaction.slippage}%  <SlippageTolerance />
                            </div>
                        </div>
                        {transaction.pending
                            ? (<div className="approvingLoading">
                                {transaction.name}:
                                <ProgressBar striped variant="success" now={100} label={`${now}%`} visuallyHidden />
                            </div>)
                            : ''}
                        {/* *************** Transaction hashes *************** */}
                        {transaction.approvedHash
                            ? (<div className="approveBox">
                                <p className='approveText'>
                                    {transaction.name}
                                    {transaction.approveSuccess
                                        ? (<span className='color-green'>Success!</span>)
                                        : (<span className='color-red'>Failed!</span>)}
                                </p>
                                <p
                                    className="viewHash"
                                >
                                    {tokens.fromTokens}
                                    {transaction.approvedAmt}
                                    <a href={transaction.approvedHash}>View Hash</a>
                                </p>
                            </div>)
                            : ''}
                        {transaction.originalHash
                            ? (<div className="approveBox">
                                <p className='approveText'>
                                    {transaction.name}
                                    {transaction.transferSuccess
                                        ? (<span className='color-green'>Success!</span>)
                                        : (<span className='color-red'>Failed!</span>)}
                                </p>
                                <p
                                    className="viewHash"
                                >
                                    {tokens.fromTokens}
                                    {transaction.transferAmount}
                                    <a href={transaction.originalHash}>View Hash</a>
                                </p>
                            </div>)
                            : ''}
                        {/* *************** BUTTONS *************** */}
                        <div className="dualBtns">
                            <div
                                className='approveBtn'
                                onClick={handleApproveClick}
                            >APPROVE <img src={Check} alt="Check" /></div>
                            <div
                                className='disenable enterApp'
                                onClick={handleTransferClick}
                            >TRANSFER <img src={LinkLogo} alt="Arrow" /></div>
                        </div>
                    </div>
                </div>
            }
            {isOtherElementVisible && <TransactionDetails />}
        </>
    );
}

export default EmmetBridge2;