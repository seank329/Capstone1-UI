import React from 'react'

class LoginPage extends React.Component{

    handleSubmit=()=>{

    }

    handleRegistration=()=>{

    }
    
    render(){
        return(
            <div className='loginPage'>
                <form name='loginForm' onSubmit={this.handleSubmit}>
                <p>Please enter your user name: <input type='text'></input></p>
                <p>Please enter your password: <input type='text'></input></p>
                <input type='submit' value='Login'></input>
                </form>
                <form name='registerForm' onSubmit={this.handleRegistration}>
                <p>Would You Like to Create a New Player?</p>
                <p>Please enter your desired user name: <input type='text'></input></p>
                <p>Please create a password: <input type='text'></input></p>
                <p>Please confirm your password: <input type='text'></input></p>
                <input type='submit' value='Register'></input>
                </form>  
            </div>
        )
    }

}

export default LoginPage