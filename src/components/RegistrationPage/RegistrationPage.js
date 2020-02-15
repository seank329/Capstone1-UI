import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import MemoryApiService from '../../services/memory-api-service'
import './RegistrationPage.css'

class RegistrationPage extends Component{

    state = {
        userName : '',
        error : null,
        password: ''
    }

    errorClear=()=>{
        if(this.state.error !== null){
            setTimeout(()=>{
                this.setState({error:null})
            },2000)
        }
    }

    onRegistrationSuccess=()=>{
        const { history } = this.props
        history.push('/login')
    }


    handleRegistration=(e)=>{
        e.preventDefault();
        const { userName, password, passwordRetype } = e.target
        if(password.value !== passwordRetype.value){
            this.setState({error:'PASSWORDS DO NOT MATCH!'})
            password.value = ''
            passwordRetype.value=''
        } else if(userName.value==='' || password.value==='' || passwordRetype.value === ''){
            this.setState({error:'REGISTRATION FIELDS CANNOT BE BLANK!'})
            userName.value=''
            password.value = ''
            passwordRetype.value=''
        } else {
            AuthApiService.postUser({
                player_name: userName.value,
                password: password.value
            })
            .then(user =>{
                MemoryApiService.setupNewPlayer(user.id)
                userName.value=''
                password.value = ''
                passwordRetype.value=''
                this.onRegistrationSuccess()
            })
            .catch(res => {
                this.setState({error:res.error})
            })
        }
    }


    render(){

        return(
            <div className='Registration'>
                <header>
                    <h2>Registration Page</h2>
                </header>
                <form name='registerForm' onSubmit={this.handleRegistration}>
                <p>Would You Like to Create a New Player?</p>
                <p>Please enter your desired user name: <input type='text' name='userName' ></input></p>
                <p>Please create a password: <input type='text' name='password' ></input></p>
                <p>Please re-type your password:<input type='text' name='passwordRetype' ></input></p>
                <input type='submit' value='Register'></input>
                </form> 
                <div className='error'>
                    {this.state.error ? this.state.error : null}
                    {this.errorClear()}
                </div> 
            </div>
        )

    }

}

export default RegistrationPage