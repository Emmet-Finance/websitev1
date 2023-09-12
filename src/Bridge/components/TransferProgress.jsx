import React from 'react';
import { useAppSelector } from '../state/store';
import TransferProgressItem from './TransferProgressItem'

function TransferProgress() {

    const transaction = useAppSelector(state => state.transaction);

    return (
        <div className="progressLine">
            <TransferProgressItem
                className={`steepLine line1 ${transaction.originalHash
                    ? "checked"
                    : (transaction.transferSuccess
                        ? ""
                        : "current")
                    }`}
                number='1'
                title="Sent"
            />
            <TransferProgressItem
                className={`steepLine line2 ${transaction.originalHash
                    ? (transaction.transferSuccess
                        ? "checked"
                        : "current")
                    : ''
                    }`}
                number='2'
                title="Confirmed"
            />
            <TransferProgressItem
                className="steepLine line3 checked"
                number='3'
                title="Routing"
            />
            <TransferProgressItem
                className="steepLine line4 checked"
                number='4'
                title="Success"
            />
        </div>
    )

}

export default TransferProgress;