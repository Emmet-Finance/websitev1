import React from 'react';
import { useAppSelector } from '../state/store';


function ApprovalReport() {

    const tokens = useAppSelector(state => state.tokens);
    const transaction = useAppSelector(state => state.transaction);

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
                        {tokens.fromTokens}
                        {transaction.approvedAmt}
                        <a href={transaction.approvedHash}>View Hash</a>
                    </p>
                </div>)
                : ''}
        </>
    )

}

export default ApprovalReport;