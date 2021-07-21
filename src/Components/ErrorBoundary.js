import React, { Component} from 'react';
import './ErrorBoundary.css';

// Since in production errors in code are not shown to the user, this class is used to catch these erros
// and display that an error has been  found. This is what the user sees.
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