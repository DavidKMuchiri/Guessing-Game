import React from 'react';

// This function is used to display the input box and respond to different actions performed on it.
const Input = ({ style, valueChange, reset }) => {

    return(
        <div>
            <input type="text"
            placeholder='place your input here'
            style={{visibility: `${style}`}}
            onClick={reset}
            onChange={valueChange}
            />
        </div>
    );
}
export default Input;