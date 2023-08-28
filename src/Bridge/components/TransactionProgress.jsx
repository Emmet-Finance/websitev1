// External imports
import React, {useState} from 'react';
import { useAppSelector } from '../state/store';
import ProgressBar from 'react-bootstrap/ProgressBar';

function TransactionProgress() {

    const transaction = useAppSelector(state => state.transaction);

    const [now, setNow] = useState(0);

    return (
        <>
            {transaction && transaction.pending
                ? (<div className="approvingLoading">
                    Approving in progress
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