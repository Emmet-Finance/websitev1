// External imports
import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../state/store';
import { approveERC20 } from 'emmet.sdk';

// SVGs
import Check from '../../assets/img/new/check.svg';
import LinkLogo from '../../assets/img/link.svg';

// Local imports
import {
    setApprovedHash,
    setOriginalHash,
    setPending,
    setTransferSuccess,
} from '../state/transactions'
import {
    getTransaction,
    transferERC20,
} from '../wallets/EVM';

import {
    setIsTxDetailVisible,
} from '../state/ui'

import { sendInstallment } from '../state/transactions';

function Commands() {

    const [showTransferButton, setShowTransferButton] = useState(false);


    const dispatch = useDispatch();
    const asyncDispatch = useDispatch();
    const chains = useAppSelector(state => state.chains);
    const tokens = useAppSelector(state => state.tokens);
    const transaction = useAppSelector(state => state.transaction);
    const ui = useAppSelector(state => state.ui);


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
        dispatch(setPending(true));
        const txHash = await approveERC20(
            chains.fromChain,
            tokens.fromTokens,
            transaction.approvedAmt
        );
        console.log("Approve hash:", txHash);
        dispatch(setApprovedHash(txHash));
        const TX = await getTransaction(
            chains.fromChain,
            `0x${txHash.slice(2)}`
        );
        dispatch(setPending(false));
        if (TX.status === "success") {
            dispatch(setTransferSuccess(true));
        } else {
            dispatch(setTransferSuccess(false));
        }
    };


    const handleTransferClick = async () => {

        asyncDispatch(sendInstallment({
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