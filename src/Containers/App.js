import React, { Component } from 'react';
import { Input } from '../Components/InputPlace.js';
import { game_control, game_reset} from '../game-code/game-control.js';
import ErrorBoundary from '../Components/ErrorBoundary.js';
import Buttons from '../Components/Buttons.js';
import './App.css';


class App extends Component{
    constructor(){
        super()
        this.state = {
            instructions: [],
            previousInstructions: [],
            input: ''
        }
    }

    componentDidMount(){
        this.setState({ instructions: game_control(this.state.input) });
    }
    
    gameControl = () => {
        if(this.state.instructions[2] === "Restart"){
            game_reset('restart');
        }
        this.setState({ instructions: game_control(this.state.input) });
    }
    gameStop = () => {
        game_reset('stop');
        this.setState({ instructions: game_control(this.state.input) });

    }
    onValueChange = (event) =>{
        this.setState({ input: event.target.value })
    }
    resetInput = (event) =>{
        if(this.state.previousInstructions !== this.state.instructions){
            event.target.value = '';
            this.setState({ previousInstructions: this.state.instructions });
        }
    }
    render(){

        if (this.state.instructions.length === 0){
            return(
                <div>
                    <h1 className="heading">Guessing Game</h1>
                    <h2 className="loading">Loading...</h2>
                </div>
            )
        }else {
            return(
                <ErrorBoundary>
                    <div className="body">
                        <div className="console">
                        <h1 className="heading">Guessing Game</h1>
                        <div className="instructions">
                            <h2>
                                {this.state.instructions[0]} 
                            </h2>
                        </div>
        
                        <div className="control">
                            <div className="controlInstructions">
                            {this.state.instructions[1]}
                            </div>
        
                            <div  className="userInput">
                                <Input
                                style={this.state.instructions[3]}
                                valueChange={this.onValueChange}
                                reset={this.resetInput}
                                />
                            {/* <input type="text" placeholder='place your input here' style={{visibility: `${this.state.instructions[3]}`}}/> */}
                            </div>
                                <Buttons
                                text={this.state.instructions[2]}
                                gamecontrol={this.gameControl}
                                gamestop={this.gameStop}
                                stopvisibility={this.state.instructions[4]}/>
                        </div>
                        </div>
        
                        <footer>
                            <h3>Game developed by MD</h3>
                            <h5>Version 1.0.0</h5>
                        </footer>
                    </div>
                </ErrorBoundary>
            )
        }
    }
}

export default App;