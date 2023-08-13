import React, { useState, useEffect } from 'react';
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
import { bnToHumanReadable, stringToBigNum, isGreaterOrEqual } from '../utils';
import { disconnect } from '../state/wallets';

function EmmetBridge2() {

    const dispatch = useDispatch();
    const wallets = useAppSelector(state => state.wallets);
    const chains = useAppSelector(state => state.chains);
    const tokens = useAppSelector(state => state.tokens);

    const [isElementVisible, setIsElementVisible] = useState(true);
    const [isOtherElementVisible, setIsOtherElementVisible] = useState(false);

    const [amount, setAmount] = useState('');
    const [receiver, setReceiver] = useState('');
    const [recieved, setReceived] = useState('');
    const [errorMessage, setError] = useState('');

    useEffect(() => {
        if (amount) {
            setReceived((stringToBigNum(amount)));
        }

    }, [amount]);

    const handleButtonClick = () => {
        setIsElementVisible(false);
        setIsOtherElementVisible(true);
    };

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

        const a = tokens.fromTokenBalances[tokens.fromTokens.toUpperCase()];
        const b = e.target.value;

        if (isGreaterOrEqual(a, b)) {
            setAmount(e.target.value)
        } else {
            setError(`Balance is not enough for this transaction`)
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
                                        ? ' ' + bnToHumanReadable(tokens.fromTokenBalances[tokens.fromTokens.toUpperCase()]) + ` ${tokens.fromTokens}`
                                        : " 0.00 " + tokens.fromTokens}
                                </p>
                            </div>
                            <div className="emmetFrom amountMax">
                                <input
                                    type="number"
                                    placeholder="Amount"
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
                                    placeholder="Amount"
                                    value={recieved ? bnToHumanReadable(recieved) : ''}
                                    readOnly
                                //onChange={e => setReceived(e.target.value)}
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
                                />
                                <p
                                    onClick={e => onSelfClickHandler(e)}
                                    className='max-button'
                                >SELF</p>
                            </div>
                            <p className="warningText">
                                <span className='warningTextItem warningText2'> 
                                    {errorMessage ? errorMessage : ''} 
                                </span>
                            </p>
                        </div>
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
                                0.001 {chains.nativeCurrency}
                            </div>
                            <div className="calculateBox">
                                <span>Slippage:</span>
                                0.5%  <SlippageTolerance />
                            </div>
                        </div>
                        <div className="approvingLoading">
                            Approving
                            <ProgressBar striped variant="success" now={now} label={`${now}%`} visuallyHidden />
                        </div>
                        <div className="approveBox">
                            <p className='approveText'>
                                Approval:
                                <span className='color-red'>Failed!</span>
                                <span className='color-green'>Success!</span>
                            </p>
                            <p className="viewHash">DAI 100.00 <a href="/bridge">View Hash</a></p>
                        </div>
                        <div className="dualBtns">
                            <div className='approveBtn' onClick={handleButtonClick} >APPROVE <img src={Check} alt="Check" /></div>
                            <div className='disenable enterApp'>TRANSFER <img src={LinkLogo} alt="Arrow" /></div>
                        </div>
                    </div>
                </div>
            }
            {isOtherElementVisible && <TransactionDetails />}
        </>
    );
}

export default EmmetBridge2;