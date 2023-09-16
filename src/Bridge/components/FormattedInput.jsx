import React, { useState, useEffect } from 'react';

function FormattedInput({ placeholder, onParentChange, externalData, disabled }) {

    const [formattedValue, setFormattedValue] = useState('');

    const formatValue = (value) => {
        // Convert the bigint to string for formatting
        const stringValue = value.toString();
        const hasPeriod = stringValue.includes('.')

        // Split the string into whole and fractional parts
        const [wholePart, fractionalPart] = stringValue.split('.');
        console.log("wholePart", wholePart, "fractionalPart", fractionalPart)

        // Format whole part with comma separators
        const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        let formattedFractionalPart;

        if (fractionalPart && fractionalPart.length <= 8){
            formattedFractionalPart = fractionalPart;
        } else if(fractionalPart){
            formattedFractionalPart = fractionalPart.slice(0,8);
        } else {
            formattedFractionalPart = '';
        }

        if (formattedFractionalPart || hasPeriod) {
            return `${formattedWholePart}.${formattedFractionalPart}`;
        } else {
            return formattedWholePart;
        }
    };

    useEffect(() => {
        if (externalData) {
            setFormattedValue(formatValue(externalData))
        }
    }, [externalData]);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;

        // Remove any characters other than digits and periods
        const sanitizedValue = inputValue.replace(/[^.\d]/g, '');

        const formatted = formatValue(sanitizedValue)

        setFormattedValue(formatted)
        onParentChange(sanitizedValue)
    };

    return (<input
        type="text"
        value={formattedValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
    />)

}

export default FormattedInput;