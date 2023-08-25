import React from 'react';
import { useAppSelector } from '../state/store';

function ErrorBlock() {

    const ui = useAppSelector(state => state.ui);

    return (
        <p className="warningText">
            <span className='warningTextItem warningText2'>
                {ui.errorMessage ? ui.errorMessage : ''}
            </span>
        </p>
    )
}

export default ErrorBlock;