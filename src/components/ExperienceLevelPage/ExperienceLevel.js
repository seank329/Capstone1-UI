/* eslint-disable default-case */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MemoryContext from '../context/MemoryContext';
import './experienceLevel.css';

/*
    The 'ExperienceLevel' component gets the player's desired level of play from a drop-down menu. The number
    of cards for play is assigned here, and passed to the 'App' component to be used globally. 
*/
class ExperienceLevel extends Component {

    static contextType=MemoryContext

    state={
        selected:false
    }

    // Switch statement assigns the number of cards in play based on player-chosen difficulty level
    handleChange=(e)=>{
        let cards
        e.preventDefault();
        this.context.updatePlayerExperienceLevel(e.target.value)
        switch(e.target.value){
            case('Test'):
                cards=2         // Test use only
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
    };
    
    // Select option drop-down for difficulty level
    render(props) {
        return(
            <div className='experienceLevelScreen'>
                <h2>Please Choose Your Level of Experience</h2>
                <select onChange={this.handleChange} required>
                    <option></option>
                    <option value='Beginner'>Beginner</option>
                    <option value='Easy'>Easy</option>
                    <option value='Medium'>Medium</option>
                    <option value='Hard'>Hard</option>
                    <option value='Expert'>Expert</option>
                </select>
                {this.state.selected===true? <Link to='/game'><button type='button' id='continueButton'>Continue</button></Link> : null}
            </div>
        )
    };

};

export default ExperienceLevel;