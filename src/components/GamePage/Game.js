import React, { Component } from 'react'
import MemoryContext from '../context/MemoryContext'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import MemoryApiService from '../../services/memory-api-service'
import CardMultiplier from '../CardMultiplier/CardMultiplier'
import './game.css'


/*
    The 'Game' component holds the game logic, as well as the render function of the main game page.
*/
class Game extends Component{

    static contextType = MemoryContext

    constructor(props){
        super(props)
        this.state = {
            cardsInPlay:[{
                id:'',
                cardFaceUp:false,
                image:''

            }],
            idsNotInPlay:[],
            cardsAreRevealed:false,
            image1:'',
            image2:'',
            checking:false,
            match:false,
            randomized:false,
            timerStart:'',
            timerEnd:'',
            timeElapsed:'',
            gameStart:false,
            won:false,
            timeSet:false,
            display:'',
            quickestTime:'',
        }
       this.updateCardsInPlay=this.updateCardsInPlay.bind(this)
       this.updateStateOfReveal=this.updateStateOfReveal.bind(this)
    }

    // For timer display. Activated at the click of the first card.
    updateStateTimer=(time)=>{
        this.setState({timer:time})
    }

    // Loads the quickest time for the current level from a previous game if the user is logged in.
    componentDidMount(){
        this.setState({randomized:true})
        setTimeout(()=>{
            if(this.context.playerId!==''){
                MemoryApiService.getQuickTime(this.context.playerId, this.context.playerExperienceLevel)
                .then(data =>{
                    this.setState({quickestTime:parseInt(Object.values(data).toString())})
                })
            }
        },500)
    }

    updateCardsInPlay=(cardArray)=>{
        if(this.state.cardsInPlay.length === 1){
            this.setState({cardsInPlay:cardArray})
        }
    }

    // Logic for determining what happens when the user clicks on a card
    updateStateOfReveal=(index)=> {
        if(index){
            let ignore = false;
            for(let i=0; i < this.state.idsNotInPlay.length; i++){
                if(index === this.state.idsNotInPlay[i]){
                        ignore = true;
                } 
            }
            if (!ignore) {
            this.setState({checking:true})
            let cardX=[...this.state.cardsInPlay]
            cardX[index].cardFaceUp = !cardX[index].cardFaceUp;
                if (this.state.image1==='' && this.state.image2 === '') {
                    this.setState({cardsInPlay:cardX,
                                cardsAreRevealed:true,
                                image1: cardX[index],
                    })
                } else if (this.state.image1 !== '' && this.state.image2 === '' && this.state.image1 !== cardX[index]) {
                    this.setState({cardsInPlay:cardX,
                                cardsAreRevealed:true,
                                image2: cardX[index],
                                checking:true
                    })
                }
            }
            if((this.state.idsNotInPlay.length === this.state.cardsInPlay.length) && this.state.cardsInPlay.length>1) {
                if(!this.state.won){
                this.setState({won:true,
                                timerEnd:Date.now(),
                                timeElapsed: Math.round((this.state.timerEnd-this.state.timerStart)/1000)})
                this.gameOver()
                }
                
            }
        }
    }   

    // Determines what happens after both cards have been flipped upright, and checks for match
    componentDidUpdate(){
        let temp = [...this.state.cardsInPlay]
        let x = this.state.image1.id
        let y = this.state.image2.id
        if(this.state.image1!==''){
            if(this.state.image1.image===this.state.image2.image){
                this.setState(prevState=> ({
                    idsNotInPlay:[x, y, ...prevState.idsNotInPlay]
                }))
                this.setState({match:true,
                                image1:'',
                                image2:'',
                                cardsInPlay:temp,
                            cardsAreRevealed:false})
            }
            else{
                if(temp[x] !== undefined &&  temp[y] !== undefined){
                    temp[x].cardFaceUp = false
                    temp[y].cardFaceUp = false
                    setTimeout(() => { this.setState({cardsInPlay: temp,
                                    match:false,
                                    image1:'',
                                    image2:'',
                                cardsAreRevealed:false})
                    }, 700)
                }
            }

        }
        // If the game is over
        if((this.state.idsNotInPlay.length === this.state.cardsInPlay.length) && this.state.cardsInPlay.length>1) {
            if(!this.state.won){
              this.setState({won:true,
                             timerEnd:Date.now()})
              setTimeout(()=>{
                let seconds = Math.round((this.state.timerEnd-this.state.timerStart)/1000)
                this.setState({
                              timeElapsed:seconds
                    })
                },500)

                setTimeout(()=>{this.gameOver()},500)
            }
             
         }
    }

    // Handles what happens when a card has been clicked
    handleClick=(e)=>{
        e.preventDefault();
        if(!this.state.gameStart){
            this.setState({timerStart:Date.now(),
                            gameStart:true})
        }
        let index = e.target.id
        this.updateStateOfReveal(index)
    }

    // Determines the elapsed time of the game, from the moment the first card has been flipped, to the 
    // last match made for completion.
    elapsedTime=()=>{
        let seconds = Math.round((this.state.timerEnd-this.state.timerStart)/1000)
        if(seconds>60){
            let minutes = Math.floor(seconds/60)
            let minSeconds = Math.floor(seconds%60)
            return(minutes + " minutes " + minSeconds + " seconds")
        } else {
            return (seconds + ' seconds')
        }
    }

    // Called by render to show details of the time elapsed.
    display=()=>{
        if(this.state.gameStart){
            return(
                <div className='time'>
                    <h3>Time Started : {format(this.state.timerStart, 'do MMM yyyy pp')}</h3>
                    {this.state.timerEnd? <h3>Time Ended : {format(this.state.timerEnd, 'do MMM yyyy pp')} </h3> : null }
                    {this.state.timerEnd? <h3>Time Elapsed : {this.elapsedTime()} </h3> : null }
                </div>
            )
        } else{
            return(
                <div></div>
            )
        }
    }

    // Makes calls to the 'MemoryApiService' on game completion if the user is logged in to update the database
    gameOver=()=>{
        let count = 0
        if(this.context.playerId!=='' && count < 1 ){
            MemoryApiService.postGamesPlayed(this.context.playerId)
            setTimeout(()=>{MemoryApiService.postTotalTimePlayed(this.state.timeElapsed, this.context.playerId)},700)
            if(this.state.quickestTime===0){
                setTimeout(()=>{MemoryApiService.postQuickestGame(this.context.playerId, this.context.playerExperienceLevel, this.state.timeElapsed)},500)
            } else if((this.state.timeElapsed < this.state.quickestTime)){
                setTimeout(()=>{MemoryApiService.postQuickestGame(this.context.playerId, this.context.playerExperienceLevel, this.state.timeElapsed)},500)
            }
            count++
        }
    }

    render(){

        return(
            <div className='gamePage'>
                <div className='cardsArea'>
                    <CardMultiplier arrayofcards={this.updateCardsInPlay} onClick={(e)=>this.handleClick(e)} 
                    image1={this.state.image1} image2={this.state.image2} notInPlay={this.state.idsNotInPlay} 
                    inPlay={this.state.cardsInPlay} stateOfRandomization={this.state.randomized} experience={this.context.cardsForExperienceLevel}/>
                </div>
                <div className='displayArea'>
                    {this.display()}
                    {this.state.won ? <h2>You've Won!</h2> : null}
                    {(this.state.won && this.context.playerId!=='')? <Link to='/player'><button type='button' id='continue'>Continue</button></Link>:null}
                    {(this.state.won && this.context.playerId==='')? <Link to='/'><button type='button' id='backToHome'>Back to Home</button></Link>:null}
                </div>
                <div className='quit'>
                    {!this.state.won ?  <Link to='/'><button type='button' id='quitButton'>Quit Game</button></Link>: null }
                </div>
            </div>
        )
    }

}

export default Game