import React from 'react';
import { Link } from 'react-router-dom';
import './errorBoundary.css'


/*
    Error boundary for the Memory Challenge app.
*/
class ErrorBoundary extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if(this.state.hasError){
      return (
        <div className='ErrorBoundary'>
        <header>
            <h1>Memory Challenge!</h1>
        </header>
        <h3 className='errorHandler'> Uh oh! Something went wrong! Please try returning to
          the homepage...
        </h3>
          <Link to='/'><button type='button'>Home</button></Link>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;