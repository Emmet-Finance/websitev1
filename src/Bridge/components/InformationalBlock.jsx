import React from 'react';
import { useAppSelector } from '../state/store';
import SlippageTolerance from './SlippageToleranceModal';
import { bigIntToHuman } from '../utils';

function InformationalBlock() {

    const chains = useAppSelector(state => state.chains);
    const tokens = useAppSelector(state => state.tokens);
    const transaction = useAppSelector(state => state.transaction);

    return (
        <div className="bridgeCalculation">
            <div className="calculateBox">
                <span>Allowance:</span>
                {tokens.tokenAllowances
                    ? `${bigIntToHuman(tokens.tokenAllowances[tokens.fromTokens.toUpperCase()])} ${tokens.fromTokens}`
                    : `0.00 ${tokens.fromTokens}`
                }
            </div>
            <div className="calculateBox">
                <span>Gas Estimation:</span>
                {transaction.nativeFee
                    ? bigIntToHuman((transaction.nativeFee), 18).slice(0,17)
                    : '0.001'}
                {" "}
                {chains.nativeCurrency}
            </div>
            <div className="calculateBox">
                <span>Slippage:</span>
                {transaction.slippage}%  <SlippageTolerance />
            </div>
        </div>
    )
}

export default InformationalBlock;