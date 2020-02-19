import React from 'react'
import { Link } from 'react-router-dom'
import MemoryContext from '../context/MemoryContext'
import AuthApiService from '../../services/auth-api-service'
import './loginPage.css'

/*
    The 'LoginPage' component diplays the login form, and displays the link for allowing users to register.
    The 'AuthApiService' is responsible for querying the database.
*/
class LoginPage extends React.Component{

    static contextType = MemoryContext;

    state = {
        userName : '',
        error : null,
        password: ''
    }

    // Clear error notification after 2 seconds
    errorClear=()=>{
        if(this.state.error !== null){
            setTimeout(()=>{
                this.setState({error:null})
            },2000)
        }
    }
    
    // Go back to the landing screen
    onLoginSuccess=()=>{
            const { location, history } = this.props
            const destination = (location.state || {}).from || '/'
            history.push(destination)
    }

    // Handle form submission.
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
                console.log(res)
                this.context.updateCurrentPlayer(nameLogin.value)
                this.context.updateCurrentPlayerId(res.id)
                nameLogin.value = ''
                passwordLogin.value = ''
                // TokenService.saveAuthToken(res.authToken)
                setTimeout(()=>{this.onLoginSuccess()},400)
            })
            .catch(res => {
                this.setState({ error:res.error })
            })
        }
        
    }
    
    // Handles login form display
    render(){
        return(
            <div className='loginPage'>
                <header>
                    <h2>Login Page</h2>
                </header>
                <form name='loginForm' onSubmit={this.handleSubmit}>
                    <p>Please enter your user name: <input type='text' name='nameLogin'></input></p>
                    <p>Please enter your password: <input type='text' name='passwordLogin'></input></p>
                    <input type='submit' value='Login' id='loginButton'></input>
                </form>
                <div className='error'>
                    {this.state.error ? this.state.error : null}
                    {this.errorClear()}
                </div>
                <div className='registerLink'>
                    <Link to='/registration'>
                        <button type='button' id='registerButton'>Register!</button>
                    </Link>
                </div>
                <div className='back'>
                    <Link to='/'>
                        <button type='button' id='backButton'>Back to Main Page</button>
                    </Link>  
                </div>      
            </div>
        )
    }

}

export default LoginPage