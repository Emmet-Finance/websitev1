import {useState} from 'react';
import React from 'react';


const MaxNumberSet = () => {
  const min = 1;
  const max = 2000;

  const [value, setValue] = useState();

  const handleChange = event => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setValue(value);
  };

  console.log(value);
  console.log(typeof value);

  return (
    <>
        <input
            type="number"
            placeholder="2000"
            value={value}
            onChange={handleChange}
        />
    </>
  );
};

export default MaxNumberSet;
