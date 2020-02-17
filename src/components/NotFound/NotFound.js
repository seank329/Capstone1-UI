import React, { Component, Children } from 'react';
import { withRouter } from 'react-router-dom';
import './notFound.css'


/*
    Default not found page for routes which do not match
*/
class NotFound extends Component {

  componentDidMount(){
    document.title = 'Page Not Found'
  }
  
  render() {
    return (
      <section className='NotFound'>
        <header>
            <h1>Memory Challenge!</h1>
        </header>
        <h2>404 - Page not found</h2>
        <p>Try going back to your previous page.</p>

        <button type='button' onClick={()=> {this.props.history.goBack()}}> Back </button>
      </section>
    );
  }
};

export default withRouter(NotFound);