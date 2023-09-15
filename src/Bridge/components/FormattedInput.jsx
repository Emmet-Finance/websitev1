import React, { useState, useEffect } from 'react';

function FormattedInput({ placeholder, onParentChange, externalData }) {

    const [formattedValue, setFormattedValue] = useState('');

    const formatValue = (value) => {
        // Convert the bigint to string for formatting
        const stringValue = value.toString();

        // Split the string into whole and fractional parts
        const [wholePart, fractionalPart] = stringValue.split('.');

        // Format whole part with comma separators
        const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        if (fractionalPart !== undefined) {
            return `${formattedWholePart}.${fractionalPart}`;
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
    />)

}

export default FormattedInput;