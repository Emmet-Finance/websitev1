import React, {useEffect, useState} from 'react';
import { useAppSelector } from '../state/store';
import SlippageTolerance from './SlippageToleranceModal';
import { bigIntToHuman } from '../utils';

function InformationalBlock() {

    const chains = useAppSelector(state => state.chains);
    const tokens = useAppSelector(state => state.tokens);
    const transaction = useAppSelector(state => state.transaction);
    const wallets = useAppSelector((state) => state.wallets);
    const [allowance, setAllowance] = useState('');

    useEffect(() => {

        if(wallets.allowances){
            setAllowance(wallets.allowances[tokens.fromTokens.toUpperCase()])
        }

    },[tokens, wallets.allowances])

    return (
        <div className="bridgeCalculation">
            <div className="calculateBox">
                <span>Allowance:</span>
                {allowance
                    ? `${bigIntToHuman(allowance)}`.slice(0,10) + ` ${tokens.fromTokens}`
                    : `0.00 ${tokens.fromTokens}`
                }
            </div>
            <div className="calculateBox">
                <span>Gas Estimation:</span>
                {"0.001 "}
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