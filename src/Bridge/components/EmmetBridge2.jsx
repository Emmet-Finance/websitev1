import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isEvmAddress } from 'emmet.sdk/utils/verifiers';
import { useAppSelector } from '../state/store';

import UpDownCirlce from '../../assets/img/up-down-circle.svg';
import CopyBridge from '../../assets/img/new/copy.svg';
import Info from '../../assets/img/new/info.svg';

import AmountBox from './AmountBox';
import AmountReceived from './AmountReceived';
import ApprovalReport from './ApprovalReport';
import Commands from './Commands';
import DropDownTokenMenu from './DropDownTokenMenue';
import DropDownChainMenu from './DropDownChainMenu';
import ErrorBlock from './ErrorBlock';
import InformationalBlock from './InformationalBlock';
import TransactionDetails from './TransactionDetails';
import TransactionProgress from './TransactionProgress';

import { copyAddressToClipboard } from '../utils';
import { setFromChain, setToChain } from '../state/chains'
import { bigIntToHuman } from '../utils';
import { disconnect } from '../state/wallets';
import { setDestinationAccount } from '../state/transactions'

function EmmetBridge2() {

    const dispatch = useDispatch();
    const wallets = useAppSelector(state => state.wallets);
    const chains = useAppSelector(state => state.chains);
    const tokens = useAppSelector(state => state.tokens);
    const ui = useAppSelector(state => state.ui);

    const [receiver, setReceiver] = useState('');

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

    const onSelfClickHandler = (e) => {
        e.preventDefault()
        setReceiver(wallets.account)
        dispatch(setDestinationAccount(wallets.account))
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
        } else {
            setReceiver('')
            dispatch(setDestinationAccount(''))
        }
    }

    return (
        <>
            {ui.isBridgeFormVisible &&
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
                        <div className="emmetFrom emmetFromtop" styles={"padding-right:0px;"}>
                            <DropDownTokenMenu
                                direction="from"
                                name="From Token"
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
                                name="To Token"
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
                                    {wallets && wallets.balances
                                        ? ' '
                                        + bigIntToHuman(wallets
                                            .balances[tokens.fromTokens.toUpperCase()])
                                        + ` ${tokens.fromTokens}`
                                        : " 0.00 " + tokens.fromTokens}
                                </p>
                            </div>
                            <div className="emmetFrom amountMax">
                                <AmountBox />
                            </div>
                        </div>
                        <div className="lineBox">
                            <div className='labelText'>
                                <p className="label label1">Amount to Receive</p>
                            </div>
                            <div className="emmetFrom amountMax">
                                <AmountReceived />
                            </div>
                        </div>
                        <div className="lineBox">
                            <div className='labelText'>
                                <span className="label label1 infoLabel">
                                    <span><p className='inline'>Target Address</p></span>
                                    <span className="inofText m-l-5">
                                        <img src={Info} alt="Info" />
                                        <span>
                                            <b>Warning:</b>
                                            Not to lose the transferred tokens, make sure the destination address is correct.
                                        </span>
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
                            <ErrorBlock />
                        </div>
                        {/* *************** Informational Block *************** */}
                        <InformationalBlock />
                        {/* ***************** Progress Bar ***************** */}
                        <TransactionProgress />
                        {/* *************** Approval Report *************** */}
                        <ApprovalReport />
                        {/* *************** BUTTONS *************** */}
                        <Commands />
                    </div>
                </div>
            }
            {ui.isTxDetailVisible && <TransactionDetails />}
        </>
    );
}

export default EmmetBridge2;