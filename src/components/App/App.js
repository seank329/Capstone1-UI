import React from 'react';
import NewCharacter from '../NewCharacterPage/NewCharacter'
import Landing from '../LandingPage/Landing'
import ExperienceLevel from '../ExperienceLevelPage/ExperienceLevel'
import Game from '../GamePage/Game'
import LoginPage from '../LoginPage/LoginPage'
import HighScores from '../HighScoresPage/HighScores'
import PlayerStats from '../PlayerStatsPage/PlayerStats'
import './App.css'

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
      currentPage : 'landingPage',
      currentPlayer: '',
      playerExperienceLevel:'',
      cardsForExperienceLevel:'',
    };
    
  }

  updateToNewCharacterPage =()=> {
    this.setState({currentPage: 'newCharacterPage'})
  }

  updateCardsForExpeienceLevel=(cards)=>{
    this.setState({cardsForExperienceLevel: cards})
  }

  updatePage = (page) => {
    this.setState({currentPage: page})
  }

  updateCurrentPlayer = (name) => {
    this.setState({currentPlayer: name})
  }

  updatePlayerExperienceLevel =(experience) => {
    this.setState({playerExperienceLevel : experience})
  }

  render(){

  if(this.state.currentPage==='landingPage'){
  return (
    <div className="App">
      <header>
          <h1>How Good is Your Memory?</h1>
      </header>
      <Landing newGame={this.updateToNewCharacterPage} changePage={this.updatePage}/>
    </div>
    );
  }
  else if(this.state.currentPage==='newCharacterPage'){
  return (
    <div className="App">
       <header>
          <h1>How Good is Your Memory?</h1>
      </header>
      <NewCharacter newName={this.updateCurrentPlayer} changePage={this.updatePage}/>
    </div>
  );
  }
  else if(this.state.currentPage==='experienceLevelPage'){
    return (
      <div className="App">
         <header>
            <h1>How Good is Your Memory?</h1>
        </header>
        <ExperienceLevel playerExperience={this.updatePlayerExperienceLevel} 
        changePage={this.updatePage} updateCardsInPlay={this.updateCardsForExpeienceLevel}/>
      </div>
    );
    }
    else if(this.state.currentPage==='gameScreen'){
      return (
        <div className="App">
           <header>
              <h1>How Good is Your Memory?</h1>
          </header>
          <Game experience={this.state.cardsForExperienceLevel} />
        </div>
      );
      }
    else if(this.state.currentPage==='loginPage'){
      return(
        <div className="App">
        <header>
           <h1>How Good is Your Memory?</h1>
       </header>
       <LoginPage />
     </div>
      )
    }
    else if(this.state.currentPage==='playerStatistics'){
      return(
        <div className="App">
        <header>
           <h1>How Good is Your Memory?</h1>
       </header>
       <PlayerStats />
     </div>
      )
    }
    else if(this.state.currentPage==='highScores'){
      return(
        <div className="App">
        <header>
           <h1>How Good is Your Memory?</h1>
       </header>
       <HighScores />
     </div>
      )
    }
  }
}

export default App;
