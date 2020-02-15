/* eslint-disable default-case */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MemoryContext from '../context/MemoryContext'
import './ExperienceLevel.css'
import MemoryApiService from '../../services/memory-api-service'

class ExperienceLevel extends Component {

    static contextType=MemoryContext

    state={
        selected:false
    }

    handleChange=(e)=>{
        let cards
        e.preventDefault();
        this.context.updatePlayerExperienceLevel(e.target.value)
        //this.props.playerExperience(e.target.value)
        switch(e.target.value){
            case('Test'):
                cards=2
                break;
            case('Beginner'):
                cards=16
                break;
            case('Easy'):
                cards=24
                break;
            case('Medium'):
                cards=32
                break;
            case('Hard'):
                cards=48
                break;
            case('Expert'):
                cards=64
                break;
        }
        this.context.updateCardsForExperienceLevel(cards)
        this.setState({selected:true})
        //this.context.updatePage('gameScreen')
        //this.props.updateCardsInPlay(cards)
        //this.props.changePage('gameScreen')
    }
    
    render(props) {
        return(
            <div className='experienceLevelScreen'>
                <h2>Please Choose Your Level of Experience</h2>
                <select onChange={this.handleChange} required>
                    <option></option>
                    <option value='Test'>Test</option>
                    <option value='Beginner'>Beginner</option>
                    <option value='Easy'>Easy</option>
                    <option value='Medium'>Medium</option>
                    <option value='Hard'>Hard</option>
                    <option value='Expert'>Expert</option>
                </select>
                {this.state.selected===true? <Link to='/game'><button type='button'>Continue</button></Link> : null}
            </div>
        )
    }

}

export default ExperienceLevel;