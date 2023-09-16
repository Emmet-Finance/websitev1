import React from 'react';
import { useAppSelector } from '../state/store';
import {  bigIntToHuman } from '../utils';
import FormattedInput from './FormattedInput';

function AmountReceived() {

    const transaction = useAppSelector(state => state.transaction);

    return (<FormattedInput 
        placeholder="To be received"
        externalData={transaction.receiveAmount
            ? bigIntToHuman(transaction.receiveAmount)
            : ''}
        disabled={true}
    />)

}

export default AmountReceived;