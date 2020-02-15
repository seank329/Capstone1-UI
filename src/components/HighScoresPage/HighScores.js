import React from 'react'
import { Link } from 'react-router-dom'
import MemoryApiService from '../../services/memory-api-service'
import './HighScores.css'

class HighScores extends React.Component{

    state={
        error:null,
        beginner:'',
        easy:'',
        medium:'',
        hard:'',
        expert:''
    }

    componentDidMount(){

        MemoryApiService.getHighScoresBeginner()
        .then(data => this.setState({beginner:data}))
        
        MemoryApiService.getHighScoresEasy()
        .then(data => this.setState({easy:data}))

        MemoryApiService.getHighScoresMedium()
        .then(data => this.setState({medium:data}))

        MemoryApiService.getHighScoresHard()
        .then(data => this.setState({hard:data}))

        MemoryApiService.getHighScoresExpert()
        .then(data => this.setState({expert:data}))



    }
    
    showTime=(seconds)=>{
        if(seconds>60){
            let minutes = Math.floor(seconds/60)
            let minSeconds = Math.floor(seconds%60)
            return(minutes + " minutes " + minSeconds + " seconds")
        } else if(seconds > 0){
            return (seconds + ' seconds')
        } else {
            return ('No Game Data For This Level')
        }
    }


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
                    <button type='button'>Back to Main Page</button>
                </Link>
            </div>
        )

    }

}

export default HighScores