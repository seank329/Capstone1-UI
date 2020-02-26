import React from 'react';
import { Link } from 'react-router-dom';
import MemoryApiService from '../../services/memory-api-service';
import './highScores.css';


/*
    The 'HighScores' Component makes calls to the 'MemoryApiService' to get and display data about player
    high scores for each difficulty level.
*/
class HighScores extends React.Component{

    state={
        error:null,
        beginner:{},
        easy:{},
        medium:{},
        hard:{},
        expert:{}
    };


    // Api calls made for the database at each difficulty level
    componentDidMount(){
        try{
        MemoryApiService.getHighScores('beginner')
            .then(data=> this.setState({beginner : data}))
        MemoryApiService.getHighScores('easy')
            .then(data=> this.setState({easy : data}))
        MemoryApiService.getHighScores('medium')
            .then(data=> this.setState({medium : data}))
        MemoryApiService.getHighScores('hard')
            .then(data=> this.setState({hard : data}))
        MemoryApiService.getHighScores('expert')
            .then(data=> this.setState({expert : data}))
        } catch(e){
            console.error(e)
        }

    };

    // Converts the time in seconds to a more readable format
    showTime=(seconds)=>{
        if(seconds>60){
            let minutes = Math.floor(seconds/60)
            let minSeconds = Math.floor(seconds%60)
            return(minutes + " minutes " + minSeconds + " seconds")
        } else if(seconds > 0){
            return (seconds + ' seconds')
        } else {
            return ('No Game Data For This Level');
        }
    };


    render(){
    
        return(
            <div className = 'HighScores'>
                <header>
                    <h2>High Scores</h2>
                </header>
                <div className='scoresArea'>
                    <h4>Beginner</h4>
                    <div className='playerName'>{Object.values(this.state.beginner)[0]}</div>
                    <div className='playerTime'>{this.showTime(Object.values(this.state.beginner)[1])}</div>
                    <h4>Easy</h4>
                    <div className='playerName'>{Object.values(this.state.easy)[0]}</div>
                    <div className='playerTime'>{this.showTime(Object.values(this.state.easy)[1])}</div>
                    <h4>Medium</h4>
                    <div className='playerName'>{Object.values(this.state.medium)[0]}</div>
                    <div className='playerTime'>{this.showTime(Object.values(this.state.medium)[1])}</div>
                    <h4>Hard</h4>
                    <div className='playerName'>{Object.values(this.state.hard)[0]}</div>
                    <div className='playerTime'>{this.showTime(Object.values(this.state.hard)[1])}</div>
                    <h4>Expert</h4>
                    <div className='playerName'>{Object.values(this.state.expert)[0]}</div>
                    <div className='playerTime'>{this.showTime(Object.values(this.state.expert)[1])}</div>
                </div>
                <Link to='/'>
                    <button type='button' id='back'>Back to Main Page</button>
                </Link>
            </div>
        )

    };

};

export default HighScores;