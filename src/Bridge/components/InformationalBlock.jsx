import React from 'react';
import { useAppSelector } from '../state/store';
import SlippageTolerance from './SlippageToleranceModal';
import { bnToHumanReadable } from '../utils';

function InformationalBlock() {

    const chains = useAppSelector(state => state.chains);
    const tokens = useAppSelector(state => state.tokens);
    const transaction = useAppSelector(state => state.transaction);

    return (
        <div className="bridgeCalculation">
            <div className="calculateBox">
                <span>Allowance:</span>
                {tokens.tokenAllowances
                    ? `${bnToHumanReadable(tokens.tokenAllowances[tokens.fromTokens.toUpperCase()])} ${tokens.fromTokens}`
                    : `0.00 ${tokens.fromTokens}`
                }
            </div>
            <div className="calculateBox">
                <span>Gas Fee:</span>
                {bnToHumanReadable((transaction.nativeFee + transaction.destinationFee), 18, 6)}
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