import React, { Component} from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
    constructor(props){
        super(props)
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(error, info){
        this.setState({ hasError: true })
    }
    render(){
        
            if (this.state.hasError){
                return (
                    <p className="error"> Ooops! Error Found. Contact Developer</p>
                );
            }

            return (this.props.children);
    }
}

export default ErrorBoundary;