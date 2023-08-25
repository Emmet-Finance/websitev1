// External imports
import React, {useState} from 'react';
import { useAppSelector } from '../state/store';
import ProgressBar from 'react-bootstrap/ProgressBar';

function TransactionProgress() {

    const transaction = useAppSelector(state => state.transaction);

    const [now, setNow] = useState(0);

    if(transaction && transaction.pending){
        while(now < 101){
            setNow(now + 1);
        }
        setNow(0);
    }

    return (
        <>
            {transaction && transaction.pending
                ? (<div className="approvingLoading">
                    {transaction.name}:
                    <ProgressBar
                        striped
                        variant="success"
                        now={100}
                        label={`${now}%`}
                        visuallyHidden
                    />
                </div>)
                : ''}
        </>

    )
}

export default TransactionProgress;