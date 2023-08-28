import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../state/store';
import { humanToBigInt } from '../utils';
import FormattedInput from './FormattedInput';
import { setReseiveAmount, setTransferAmount } from '../state/transactions';
const BigInt = window.BigInt;

function AmountReceived() {

    const dispatch = useDispatch();
    const tokens = useAppSelector(state => state.tokens);
    const transaction = useAppSelector(state => state.transaction);

    const handleReceivedOnChange = (value) => {
        const _received = humanToBigInt(parseFloat(value).toString());
        const _amount = transaction.slippage
            ? (_received / transaction.slippage / 100) + _received
            : _received;
        dispatch(setReseiveAmount(_received.toString()));
        dispatch(setTransferAmount(_amount.toString()));
        console.log("_received", _received, "_amount", _amount)
    }

    return (<FormattedInput 
        placeholder="To be received"
        onParentChange={handleReceivedOnChange}
        externalData={transaction.receiveAmount
            ? BigInt(transaction.receiveAmount) / 10n ** BigInt(tokens.fromDecimals)
            : ''}
    />)

}

export default AmountReceived;