import React from 'react'
import { Link } from 'react-router-dom'
import MemoryApiService from '../../services/memory-api-service'
import MemoryContext from '../context/MemoryContext'
import AuthApiService from '../../services/auth-api-service'
import TokenService from '../../services/token-service'

class LoginPage extends React.Component{

    static contextType = MemoryContext;

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
    
    onLoginSuccess=()=>{
            const { location, history } = this.props
            const destination = (location.state || {}).from || '/'
            history.push(destination)
    }

    // onRegistrationSuccess=()=>{
    //         const { history } = this.props
    //         history.push('/login')
    // }

    handleSubmit=(e)=>{
        e.preventDefault();
        const { nameLogin, passwordLogin } = e.target
        if(nameLogin.value ==='' || passwordLogin.value===''){
            this.setState({error:'LOGIN FIELDS CANNOT BE BLANK!'})
        } else {
            AuthApiService.postLogin({
                player_name: nameLogin.value,
                password: passwordLogin.value
            })
            .then(res => {
                this.context.updateCurrentPlayer(nameLogin.value)
                nameLogin.value = ''
                passwordLogin.value = ''
                TokenService.saveAuthToken(res.authToken)
                setTimeout(()=>{this.onLoginSuccess()},400)
            })
            .catch(res => {
                this.setState({ error:res.error })
            })
        }
        
    }

    // handleRegistration=(e)=>{
    //     e.preventDefault();
    //     const { userName, password, passwordRetype } = e.target
    //     if(password.value !== passwordRetype.value){
    //         this.setState({error:'PASSWORDS DO NOT MATCH!'})
    //         password.value = ''
    //         passwordRetype.value=''
    //     } else if(userName.value==='' || password.value==='' || passwordRetype.value === ''){
    //         this.setState({error:'REGISTRATION FIELDS CANNOT BE BLANK!'})
    //         userName.value=''
    //         password.value = ''
    //         passwordRetype.value=''
    //     } else {
    //         AuthApiService.postUser({
    //             player_name: userName.value,
    //             password: password.value
    //         })
    //         .then(user =>{
    //             userName.value=''
    //             password.value = ''
    //             passwordRetype.value=''
    //             this.onRegistrationSuccess()
    //         })
    //         .catch(res => {
    //             this.setState({error:res.error})
    //         })
    //     }
    // }
    
    render(){
        return(
            <div className='loginPage'>
                <header>
                    <h2>Login Page</h2>
                </header>
                <form name='loginForm' onSubmit={this.handleSubmit}>
                <p>Please enter your user name: <input type='text' name='nameLogin'></input></p>
                <p>Please enter your password: <input type='text' name='passwordLogin'></input></p>
                <input type='submit' value='Login'></input>
                </form>
                <div className='error'>
                    {this.state.error ? this.state.error : null}
                    {this.errorClear()}
                </div>
                <Link to='/registration'>
                    <button type='button'>Register!</button>
                </Link>
                {/* <form name='registerForm' onSubmit={this.handleRegistration}>
                <p>Would You Like to Create a New Player?</p>
                <p>Please enter your desired user name: <input type='text' name='userName' ></input></p>
                <p>Please create a password: <input type='text' name='password' ></input></p>
                <p>Please re-type your password:<input type='text' name='passwordRetype' ></input></p>
                <input type='submit' value='Register'></input>
                </form>   */}
            </div>
        )
    }

}

export default LoginPage