import React from 'react';
import TransferProgressItem from './TransferProgressItem'

function TransferProgress() {

    return (
        <div className="progressLine">
            <TransferProgressItem 
                className="steepLine line1 checked"
                number='1'
                title="Sent"
            />
            <TransferProgressItem 
                className="steepLine line2 current"
                number='2'
                title="Confirmed"
            />
            <TransferProgressItem 
                className="steepLine line3 "
                number='3'
                title="Routing"
            />
            <TransferProgressItem 
                className="steepLine line4"
                number='4'
                title="Success"
            />
        </div>
    )

}

export default TransferProgress;