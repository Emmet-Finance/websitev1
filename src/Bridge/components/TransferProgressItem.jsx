import React from 'react';

function TransferProgressItem({
    className,
    number,
    title
}) {

    return (
        <div
            className={className}
        >
            <span>{number}</span>
            <label htmlFor="">
                {title}
            </label>
        </div>
    )

}

export default TransferProgressItem;