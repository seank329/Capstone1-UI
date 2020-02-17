import React from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import MemoryContext from '../context/MemoryContext'
import MemoryApiService from '../../services/memory-api-service'
import './landing.css'


/*
    The 'Landing' component shows the opening page, and the links shown is dependent upon whether the player
    is logged in or not. Game information is shown to unregistered users as an introduction.
*/
class Landing extends React.Component{

    static contextType=MemoryContext;

    state={
        message:'',
        hasId:false,
        loggedIn:false,
    }

    // Checks for an authToken when the component is initally mounted
    componentDidMount(){
        setTimeout(()=>{
            if(!this.state.hasId && TokenService.hasAuthToken()){
                this.setState({hasId:true,
                                loggedIn:true})
                MemoryApiService.getPlayerId(this.context.playerName)
                .then(id =>
                    this.context.updateCurrentPlayerId(id.id)
                  )
            } 
        },600)
    }

    // Logout of the application
    logoutApp=()=>{
        TokenService.clearAuthToken()
        this.setState({loggedIn:false})
    }

    // Called by the render funtion, display shows different game links dependent upon the user being logged in
    display=()=>{
        if(TokenService.hasAuthToken()){
            return(
                <div className='registeredDisplay'>
                    <h2>Hello, {this.context.playerName} !</h2>
                    <div className='links'>
                        <Link to='/experience'>
                            <button type='button' id='newCharacterPage'>Start a New Game</button>
                        </Link>
                    </div>
                    <div className='links'>
                        <Link to='/scores'>
                            <button type='button' id='highScores'>See High Scores</button>
                        </Link>     
                    </div>
                    <div className='links'>
                        <Link to='/player'>
                            <button type='button' id='playerStatistics'>See Player Statistics</button>
                        </Link>
                    </div>                     
                    <div className='links'>
                        <button type='button' id='logout' onClick={()=>this.logoutApp()}>Logout</button>
                    </div>
                </div>
            )
        } else {
            return(
                <div className='unRegisteredDisplay'>
                    <div className='links'>
                        <Link to='/new'>
                            <button type='button' id='newCharacterPage'>Start a New Game / Login</button>
                        </Link>
                    </div>
                    <div className='links'>
                        <Link to='/scores'>
                            <button type='button' id='highScores'>See High Scores</button>
                        </Link>  
                    </div>
                    <div className='welcome'>
                        <h3>Welcome to the memory game where you try to find matching pairs of cards which
                        have been randomly sorted.</h3>
                        <h3> Please register to view and post your best times!</h3>    
                    </div>                
                </div>
            )
        }
    }

    render(props){

        return(
            <div className='Landing'>
                    <section className='userChoices'>
                       {this.display()}
                    </section>
            </div>
        )
    }
}

export default Landing