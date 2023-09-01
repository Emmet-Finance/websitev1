import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../state/store';
import { bigIntToHuman } from '../utils';
import { setFromTokenAllowances } from '../state/tokens';
/* global BigInt */

function ApprovalReport() {

    const dispatch = useDispatch();
    const chains = useAppSelector(state => state.chains);
    const tokens = useAppSelector(state => state.tokens);
    const transaction = useAppSelector(state => state.transaction);

    useEffect(() => {

        if (transaction && tokens
            && transaction.approvedHash
            && transaction.approveSuccess
            && transaction.approvedAmt
        ) {
            dispatch(setFromTokenAllowances(BigInt(transaction.approvedAmt).toString()))
        }
    }, [
        dispatch,
        tokens,
        transaction,
        transaction.approvedHash,
        transaction.approveSuccess,
        transaction.approvedAmt,
        tokens.approvedAmt
    ])

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