import React from 'react';
import { useAppSelector } from '../state/store';
import { bigIntToHuman } from '../utils';
/* global BigInt */

function ApprovalReport() {

    const chains = useAppSelector(state => state.chains);
    const tokens = useAppSelector(state => state.tokens);
    const transaction = useAppSelector(state => state.transaction);

    let rootUrl = chains
        .supportedChains[chains
            .fromChain
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '')]
        .blockExplorers.default.url;

    return (
        <>
            {transaction && transaction.approvedHash
                ? (<div className="approveBox">
                    <p className='approveText'>
                        Approve:
                        {transaction.approveSuccess
                            ? (<span className='color-green'>Success!</span>)
                            : (<span className='color-red'>Failed!</span>)}
                    </p>
                    <p
                        className="viewHash"
                    >
                        {`${tokens.fromTokens} ${bigIntToHuman(transaction.approvedAmt)}`}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`${rootUrl}/tx/${transaction.approvedHash}`}>View Hash</a>
                    </p>
                </div>)
                : ''}
        </>
    )

}

export default ApprovalReport;