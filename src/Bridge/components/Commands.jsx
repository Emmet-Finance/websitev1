// External imports
import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../state/store';

// SVGs
import Check from '../../assets/img/new/check.svg';
import LinkLogo from '../../assets/img/link.svg';

// Local imports
import {setIsTxDetailVisible} from '../state/ui'
import {
    approveAmount,
    sendInstallment
} from '../state/transactions';

function Commands() {

    const [showTransferButton, setShowTransferButton] = useState(false);


    const dispatch = useDispatch();
    const asyncDispatch = useAppDispatch();
    const chains = useAppSelector(state => state.chains);
    const tokens = useAppSelector(state => state.tokens);
    const transaction = useAppSelector(state => state.transaction);
    const ui = useAppSelector(state => state.ui);
    const wallets = useAppSelector(state => state.wallets);


    useEffect(()=> {
        if(!ui.needApproval
            && transaction.transferAmount
            && transaction.destinationAddress){
                setShowTransferButton(true)
            }else{
                setShowTransferButton(false)
            }
    },[
        ui.needApproval, 
        transaction.transferAmount, 
        transaction.destinationAddress
    ])


    const handleApproveClick = async () => {

        await asyncDispatch(approveAmount({
            fromChain: chains.fromChain,
            approvedAmt: transaction.approvedAmt,
            fromTokens: tokens.fromTokens,
            sender: wallets.account
        }));

    };


    const handleTransferClick = async () => {

        await asyncDispatch(sendInstallment({
            fromChain: chains.fromChain,
            toChain: chains.toChain,
            fromTokens: tokens.fromTokens,
            transferAmount: transaction.transferAmount,
            destinationAddress: transaction.destinationAddress
        }));

        dispatch(setIsTxDetailVisible(true));
    }

    return (
        <div className="dualBtns">

            {/* ******* APPROVE BUTTON ******* */}
            <div
                className={ui.needApproval
                    ? 'approveBtn'
                    : 'disabled approveBtn'
                }
                onClick={handleApproveClick}
            >
                APPROVE
                <img src={Check} alt="Check" />
            </div>

            {/* ******* TRANSFER BUTTON ******* */}
            <div
                className={showTransferButton
                    ? 'enterApp'
                    : 'disabled enterApp'
                }
                onClick={handleTransferClick}
            >
                TRANSFER
                <img src={LinkLogo} alt="Arrow" />
            </div>
        </div>
    )
}

export default Commands;