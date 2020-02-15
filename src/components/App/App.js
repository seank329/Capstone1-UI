import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from '../routes/PrivateRoute'
import PublicRoute from '../routes/PublicRoute'
import MemoryContext from '../context/MemoryContext'
import NewCharacter from '../NewCharacterPage/NewCharacter'
import Landing from '../LandingPage/Landing'
import RegistrationPage from '../RegistrationPage/RegistrationPage'
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
      currentPlayerId:'',
      playerExperienceLevel:'',
      cardsForExperienceLevel:'',
    };
    
  }

  updateCurrentPlayerId=(newId)=>{
    this.setState({currentPlayerId:newId})
  }

  updateToNewCharacterPage =()=> {
    this.setState({currentPage: 'newCharacterPage'})
  }

  updateCardsForExperienceLevel=(cards)=>{
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
    const contextValue = {
      updatePlayerExperienceLevel:this.updatePlayerExperienceLevel,
      updateCardsForExperienceLevel:this.updateCardsForExperienceLevel,
      playerExperienceLevel:this.state.playerExperienceLevel,
      cardsForExperienceLevel:this.state.cardsForExperienceLevel,
      updateCurrentPlayer:this.updateCurrentPlayer,
      playerName:this.state.currentPlayer,
      updateCurrentPlayerId:this.updateCurrentPlayerId,
      playerId:this.state.currentPlayerId
    }

  return(
    <div className='App'>
      <header>
        <h1>How good is your memory?</h1>
      </header>
      <main>
      <MemoryContext.Provider value={contextValue}>
      <Switch>
          <Route
            exact
            path={'/'}
            component={Landing}
          />
          <PublicRoute
              path={'/login'}
              component={LoginPage}
            />
          <PublicRoute
              path={'/registration'}
              component={RegistrationPage}
            />
          <Route
              path={'/new'}
              component={NewCharacter}
            />
            <Route
              path={'/experience'}
              component={ExperienceLevel}
            />
            <Route
              path={'/game'}
              component={Game}
            />
            <PrivateRoute
              path={'/player'}
              component={PlayerStats}
            />
            <Route
              path={'/scores'}
              component={HighScores}
            />
      </Switch>
      </MemoryContext.Provider>
      </main>
    </div>
  )
  // if(this.state.currentPage==='landingPage'){
  // return (
  //   <div className="App">
  //     <header>
  //         <h1>How Good is Your Memory?</h1>
  //     </header>
  //     <Landing newGame={this.updateToNewCharacterPage} changePage={this.updatePage}/>
  //   </div>
  //   );
  // }
  // else if(this.state.currentPage==='newCharacterPage'){
  // return (
  //   <div className="App">
  //      <header>
  //         <h1>How Good is Your Memory?</h1>
  //     </header>
  //     <NewCharacter newName={this.updateCurrentPlayer} changePage={this.updatePage}/>
  //   </div>
  // );
  // }
  // else if(this.state.currentPage==='experienceLevelPage'){
  //   return (
  //     <div className="App">
  //        <header>
  //           <h1>How Good is Your Memory?</h1>
  //       </header>
  //       <ExperienceLevel playerExperience={this.updatePlayerExperienceLevel} 
  //       changePage={this.updatePage} updateCardsInPlay={this.updateCardsForExpeienceLevel}/>
  //     </div>
  //   );
  //   }
  //   else if(this.state.currentPage==='gameScreen'){
  //     return (
  //       <div className="App">
  //          <header>
  //             <h1>How Good is Your Memory?</h1>
  //         </header>
  //         <Game experience={this.state.cardsForExperienceLevel} />
  //       </div>
  //     );
  //     }
  //   else if(this.state.currentPage==='loginPage'){
  //     return(
  //       <div className="App">
  //       <header>
  //          <h1>How Good is Your Memory?</h1>
  //      </header>
  //      <LoginPage />
  //    </div>
  //     )
  //   }
  //   else if(this.state.currentPage==='playerStatistics'){
  //     return(
  //       <div className="App">
  //       <header>
  //          <h1>How Good is Your Memory?</h1>
  //      </header>
  //      <PlayerStats />
  //    </div>
  //     )
  //   }
  //   else if(this.state.currentPage==='highScores'){
  //     return(
  //       <div className="App">
  //       <header>
  //          <h1>How Good is Your Memory?</h1>
  //      </header>
  //      <HighScores />
  //    </div>
  //     )
  //   }
  }
}

export default App;
