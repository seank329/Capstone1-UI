import React from 'react'
import { Link } from 'react-router-dom' 
import MemoryContext from '../context/MemoryContext'
import MemoryApiService from '../../services/memory-api-service'


class PlayerStats extends React.Component {

    static contextType = MemoryContext

    state={
        name:'',
        totalGames:'',
        totalTime:'',
        beginner:0,
        easy:0,
        medium:0,
        hard:0,
        expert:0
    }

    componentDidMount(){
        try{
            setTimeout(()=>{ 
                MemoryApiService.getPlayerStats(this.context.playerName)
                .then(data => {
                    this.setState({
                        name:data.player_name,
                        totalGames:data.games_played,
                        totalTime:data.total_time_played,
                        beginner:data.quickest_game_played_beginner,
                        easy:data.quickest_game_played_easy,
                        medium:data.quickest_game_played_medium,
                        hard:data.quickest_game_played_hard,
                        expert:data.quickest_game_played_expert,
                    })
                })

            },600)
        } catch(err) {
                console.log(err)
        }

    }

    render(){

        return(
            <div className='playerStats'>
                <header>
                    <h2>Player Statistics</h2>
                </header>
                <p>Total Games Played : {this.state.totalGames ? this.state.totalGames : null}</p>
                <p>Total Time Played: {this.state.totalTime ? this.state.totalTime : null}</p>
                <p>Quickest Time for Beginner: {this.state.beginner===0 ? 'No Games Played' : this.state.beginner}</p>
                <p>Quickest Time for Easy: {this.state.easy===0 ? 'No Games Played' : this.state.easy}</p>
                <p>Quickest Time for Medium: {this.state.medium===0 ? 'No Games Played' : this.state.medium}</p>
                <p>Quickest Time for Hard: {this.state.hard===0 ? 'No Games Played' : this.state.hard}</p>
                <p>Quickest Time for Expert: {this.state.expert===0 ? 'No Games Played' : this.state.expert}</p>
                <Link to='/'>
                    <button type='button'>Back to Main Page</button>
                </Link>   
            </div>
        )
    }

}
export default PlayerStats