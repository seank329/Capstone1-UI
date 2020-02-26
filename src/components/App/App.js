import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';
import MemoryContext from '../context/MemoryContext';
import NewCharacter from '../NewCharacterPage/NewCharacter';
import Landing from '../LandingPage/Landing';
import NotFound from '../NotFound/NotFound';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import ExperienceLevel from '../ExperienceLevelPage/ExperienceLevel';
import Game from '../GamePage/Game';
import LoginPage from '../LoginPage/LoginPage';
import HighScores from '../HighScoresPage/HighScores';
import PlayerStats from '../PlayerStatsPage/PlayerStats';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import IdleService from '../../services/idle-service';
import background from '../../images/001.png'
import './app.css';


const styles = {
  Home:{
      backgroundImage:`url(${background})`,
      backgroundSize:'cover'
  }
}


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
    
  };

  componentDidMount(){
/*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
   IdleService.setIdleCallback(this.logoutFromIdle);

   /* if a user is logged in */
   if (TokenService.hasAuthToken()) {
     /*
       tell the idle service to register event listeners
       the event listeners are fired when a user does something, e.g. move their mouse
       if the user doesn't trigger one of these event listeners,
         the idleCallback (logout) will be invoked
     */
     IdleService.regiserIdleTimerResets();

     /*
       Tell the token service to read the JWT, looking at the exp value
       and queue a timeout just before the token expires
     */
     TokenService.queueCallbackBeforeExpiry(() => {
       /* the timoue will call this callback just before the token expires */
       AuthApiService.postRefreshToken();
     })
   }
  };


  updateCurrentPlayerId=(newId)=>{
    this.setState({currentPlayerId:newId})
  };

  updateToNewCharacterPage =()=> {
    this.setState({currentPage: 'newCharacterPage'})
  };

  updateCardsForExperienceLevel=(cards)=>{
    this.setState({cardsForExperienceLevel: cards})
  };

  updatePage = (page) => {
    this.setState({currentPage: page})
  };

  updateCurrentPlayer = (name) => {
    this.setState({currentPlayer: name})
  };

  updatePlayerExperienceLevel =(experience) => {
    this.setState({playerExperienceLevel : experience})
  };

  componentWillUnmount(){
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets();
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry();
  };

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken();
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry();
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets();
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate();
  };

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
    };

  return(
    <div className='App' style={styles.Home}>
      <header>
        <h1>Memory Challenge!</h1>
      </header>
      <main>
      <ErrorBoundary>
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
                <Route
                  component={NotFound}
                  />
          </Switch>
        </MemoryContext.Provider>
      </ErrorBoundary>
      </main>
    </div>
  )

  }
};

export default App;
