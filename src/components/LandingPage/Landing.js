import React from 'react'
import './Landing.css'

class Landing extends React.Component{

    updateNextPage=(number)=>{
        console.log(number)
    }

    render(props){

        return(
            <div>
                <main>
                    <section className = 'userChoices'onClick={(e) => this.props.changePage(e.target.id)}>
                        <button type='button' id='newCharacterPage'>Start a New Game</button>    
                        <button type='button' id='highScores'>See High Scores</button>

                        <button type='button' id='playerStatistics'>See Player Statistics</button>
                        <button type='button' id='exitGame'>Exit Game</button>
                    </section>
                </main>
            </div>
        )
    }
}

export default Landing