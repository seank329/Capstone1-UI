import React from 'react';
import { Link } from 'react-router-dom' ;
import MemoryContext from '../context/MemoryContext';
import MemoryApiService from '../../services/memory-api-service';
import './playerStats.css';

/*
    The 'PlayerStats' component render function displays the player statistics if the player is logged in.
    'MemoryApiService' handles calls to the database based off of the unique player name.
*/
class PlayerStats extends React.Component {

    static contextType = MemoryContext

    state={
        name:'',
        totalGames:0,
        totalTime:0,
        beginner:0,
        easy:0,
        medium:0,
        hard:0,
        expert:0
    };

    // Makes calls to the API service to get the player statistics and load them into state.
    componentDidMount(){
        try{
            setTimeout(()=>{ 
                MemoryApiService.getPlayerStats(this.context.playerId)
                .then(data => {
                    this.setState({
                        name:data.player_name,
                        totalGames:data.games_played,
                        totalTime:data.total_time_played,
                        beginner:data.quickest_game_played_beginner,
                        easy:data.quickest_game_played_easy,
                        medium:data.quickest_game_played_medium,
                        hard:data.quickest_game_played_hard,
                        expert:data.quickest_game_played_expert
                    })
                    //return data
                })
            },600);
        } catch(err) {
                console.error(err)
        }

    };

    // Converts the time in seconds to a more readable format
    showTime=(seconds)=>{
        if(seconds>60){
            let minutes = Math.floor(seconds/60);
            let minSeconds = Math.floor(seconds%60);
            return(minutes + " minutes " + minSeconds + " seconds");
        } else if(seconds > 0){
            return (seconds + ' seconds');
        } else {
            return ('No Game Data For This Level');
        }
    };

    // Display for player statistics
    render(){
        return(
            <div className='PlayerStats'>
                <header>
                    <h2>Player Statistics</h2>
                </header>
                <p>Total Games Played : {this.state.totalGames ? this.state.totalGames : 0}</p>
                <p>Total Time Played: {this.state.totalTime ? this.showTime(parseInt(this.state.totalTime)) : 'No Games Played'}</p>
                <p>Quickest Time for Beginner: {this.state.beginner===0 ? 'No Games Played' : this.showTime(parseInt(this.state.beginner))}</p>
                <p>Quickest Time for Easy: {this.state.easy===0 ? 'No Games Played' : this.showTime(parseInt(this.state.easy))}</p>
                <p>Quickest Time for Medium: {this.state.medium===0 ? 'No Games Played' : this.showTime(parseInt(this.state.medium))}</p>
                <p>Quickest Time for Hard: {this.state.hard===0 ? 'No Games Played' : this.showTime(parseInt(this.state.hard))}</p>
                <p>Quickest Time for Expert: {this.state.expert===0 ? 'No Games Played' : this.showTime(parseInt(this.state.expert))}</p>
                <Link to='/'>
                    <button type='button'>Back to Main Page</button>
                </Link>   
            </div>
        );
    };

};
export default PlayerStats;