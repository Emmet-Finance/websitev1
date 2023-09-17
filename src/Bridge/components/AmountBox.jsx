import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../state/store';
import { setErrorMessage, setNeedApproval } from '../state/ui';
import {
    setApprovedAmount,
    setTransferAmount,
} from '../state/transactions'
import {
    isGreaterOrEqual,
    humanToBigInt,
} from '../utils';
import FormattedInput from './FormattedInput';

const BigInt = window.BigInt;

function AmountBox() {

    const dispatch = useDispatch();
    const tokens = useAppSelector(state => state.tokens);
    const transaction = useAppSelector(state => state.transaction);
    const wallets = useAppSelector((state) => state.wallets);

    const handleAmountChange = async (value) => {
        dispatch(setErrorMessage(''));
        const a = parseFloat(value);

        if (value && a) {
            const b = wallets.balances
                ? wallets.balances[tokens.fromTokens.toUpperCase()]
                : 0;

            if (b) {
                const aToDec = humanToBigInt(value);

                // Check whether balance (b) is > than transfer amount (aToDec)
                if (isGreaterOrEqual(b, aToDec)) {
                    dispatch(setTransferAmount(aToDec.toString()))

                    // Check whether approval is required
                    const allowance = wallets.allowances
                        ? wallets.allowances[tokens.fromTokens.toUpperCase()]
                        : 0;
                    if (!isGreaterOrEqual(allowance, aToDec)) {
                        dispatch(setNeedApproval(true));
                        dispatch(setApprovedAmount(aToDec.toString()));
                    } else {
                        dispatch(setNeedApproval(false));
                    }
                } else {
                    dispatch(setErrorMessage(`Balance is not enough for this transaction`));
                }
            } else {
                if (!b) { dispatch(setErrorMessage(`No wallet connected to check the balance.`)); }
                if (!a) { dispatch(setErrorMessage(`Amount is not provided`)); }
            }
        } else {
            dispatch(setTransferAmount(''));
        }

    }


    const onMaxClickHandle = (e) => {
        e.preventDefault()
        const maxAmount = tokens.fromTokenBalances
            ? tokens.fromTokenBalances[tokens.fromTokens.toUpperCase()]
            : '';
        if (maxAmount) {
            dispatch(setTransferAmount(maxAmount));
        } else {
            dispatch(setErrorMessage(`No wallet connected to check the balance.`));
        }
    }


    return (
        <>
            <FormattedInput
                placeholder="To be sent"
                onParentChange={handleAmountChange}
                externalData={transaction.transferAmount
                    ? BigInt(transaction.transferAmount) / 10n ** BigInt(tokens.fromDecimals)
                    : ''}
            />
            <p
                onClick={e => onMaxClickHandle(e)}
                className='max-button'
            >
                MAX
            </p>
        </>
    )
}


export default AmountBox;