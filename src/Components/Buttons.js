import React from 'react';

// This functions is used to display buttons used in the game.
const Buttons = ({gamecontrol, gamestop, text, stopvisibility}) => {
    return(
        <div className="buttons">
            <button className="mainBtn" onClick={gamecontrol}>{text}</button>
            <button className="stopBtn" style={{visibility: stopvisibility}} onClick={gamestop}>Stop</button>
        </div>
    );
}

export default Buttons;