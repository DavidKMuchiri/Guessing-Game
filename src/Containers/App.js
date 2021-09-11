import React, { Component } from 'react';
import Input from '../Components/InputPlace.js';
import { game_control, game_reset} from '../game-code/game-control.js';
import ErrorBoundary from '../Components/ErrorBoundary.js';
import Particles from 'react-particles-js';
import Buttons from '../Components/Buttons.js';
import './App.css';
// import { ParticlesOptions } from 'tsparticles/Options/Classes/Particles/ParticlesOptions';

const particlesOptions = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 1000 
        }
      },
      color: {
        value: 'rgb(255, 255, 255)'
      },
      line_linked: {
        distance: 120,
        color: {
            value: 'rgb(255, 81, 0)'
        }
      },
      size: {
        value: 3
      }
    }
  }

// We use a class and not a function so as to use state to control the game.
// The App controls the state and passes certain properties to different components of the game.
class App extends Component{
    constructor(){
        super()
    // Previous Instructions variable is used to for resetting the input box on click.
        this.state = {
            instructions: [],
            previousInstructions: [],
            input: ''
        }
    }

    componentDidMount(){
        setTimeout(
            function() {
                this.setState({ instructions: game_control(this.state.input) });
            }
            .bind(this),
            1500
        );
    }
    
    particleChange = () => {
        let footer = this.state.instructions[5];
        // let colorChoices = ['rgb(0, 247, 255)', 'rgb(0, 60, 255)', 'rgb(0, 255, 76)',
        // 'rgb(255, 0, 0)', 'rgb(255, 0, 119)', 'rgb(140, 0, 255)'];

        if(footer === `**Happy birthday MD**`){
            particlesOptions.particles.line_linked.color.value = "rgb(255, 0, 0)";
            particlesOptions.particles.color.value = "rgb(255, 255, 255)";
        }
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
        this.particleChange();
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
                    <Particles className="particles" 
                    params={particlesOptions}
                    />
                        <div className="console">
                        <h1 className="heading">Guessing Game</h1>
                        <h3 className="motto">simple fun</h3>
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
                            <h3>{this.state.instructions[5]}</h3>
                            <h5>Version 1.4.0</h5>
                        </footer>
                    </div>
                </ErrorBoundary>
            )
        }
    }
}

export default App;