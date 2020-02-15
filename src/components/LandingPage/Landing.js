import React from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import MemoryContext from '../context/MemoryContext'
import MemoryApiService from '../../services/memory-api-service'
import './Landing.css'

class Landing extends React.Component{

    static contextType=MemoryContext;

    state={
        message:'',
        hasId:false,
        loggedIn:false,
    }

    updateNextPage=(number)=>{
        console.log(number)
    }

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

    logoutApp=()=>{
        TokenService.clearAuthToken()
        this.setState({loggedIn:false})
    }

    display=()=>{
        if(TokenService.hasAuthToken()){
            return(
                <div className='registeredDisplay'>
                <h2>Hello, {this.context.playerName} !</h2>
                <Link to='/experience'>
                <button type='button' id='newCharacterPage'>Start a New Game</button>
                </Link>
                <Link to='/scores'>
                <button type='button' id='highScores'>See High Scores</button>
                </Link>                          
                <Link to='/player'>
                <button type='button' id='playerStatistics'>See Player Statistics</button>
                </Link>
                    <button type='button' id='logout' onClick={()=>this.logoutApp()}>Logout</button>
                </div>
            )
        } else {
            return(
                <div className='unRegisteredDisplay'>
                <Link to='/new'>
                <button type='button' id='newCharacterPage'>Start a New Game</button>
                </Link>
                <Link to='/scores'>
                <button type='button' id='highScores'>See High Scores</button>
                </Link>                          
                </div>
            )
        }
    }

    render(props){

        return(
            <div>
                <main>
                    <section className = 'userChoices' /*onClick={(e) => this.props.changePage(e.target.id)*/ >
                       {this.display()}
                    </section>
                </main>
            </div>
        )
    }
}

export default Landing