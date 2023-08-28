// External imports
import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../state/store';
import ProgressBar from 'react-bootstrap/ProgressBar';

function TransactionProgress() {

    const transaction = useAppSelector(state => state.transaction);

    const [now, setNow] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setNow(prev => prev + 1)
        }, 100)
    },[]);

    useEffect(() => {
        if( now >= 100){
            setNow(0)
        }
    }, [now])

    return (
        <>
            {transaction && transaction.pending
                ? (<div className="approvingLoading">
                    Transaction in progress:
                    <ProgressBar
                        animated
                        striped
                        variant="success"
                        now={now}
                        label={`${now}%`}
                        visuallyHidden
                    />
                </div>)
                : ''}
        </>

    )
}

export default TransactionProgress;