import React from 'react';

export const Input = ({ style, valueChange, reset }) => {

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
