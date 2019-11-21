/* eslint-disable default-case */
import React from 'react'
import './ExperienceLevel.css'
import MemoryApiService from '../../services/memory-api-service'

class ExperienceLevel extends React.Component {

    handleChange=(e)=>{
        let cards
        e.preventDefault();
        this.props.playerExperience(e.target.value)
        switch(e.target.value){
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
        this.props.updateCardsInPlay(cards)
        this.props.changePage('gameScreen')
    }
    
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
            </div>
        )
    }

}

export default ExperienceLevel;