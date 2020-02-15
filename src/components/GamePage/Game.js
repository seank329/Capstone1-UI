import React, { Component } from 'react'
import MemoryContext from '../context/MemoryContext'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import MemoryApiService from '../../services/memory-api-service'
import './Game.css'
import CardMultiplier from '../CardMultiplier/CardMultiplier'

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
       //this.updateStateTimer=this.updateStateTimer.bind(this)
    }

    updateStateTimer=(time)=>{
        this.setState({timer:time})
    }

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

    
    updateStateOfReveal=(index)=> {
        let ignore = false;
        console.log(index)
        console.log(this.state.idsNotInPlay.length)
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
         //setTimeout(() => {alert('You Won!')}, 750)
        }
         
     }
    }   

    componentDidUpdate(){
        let temp = [...this.state.cardsInPlay]
        let x = this.state.image1.id
        let y = this.state.image2.id
        if(this.state.image1!==''){
            if(this.state.image1.image===this.state.image2.image){
                this.setState(prevState=> ({
                    idsNotInPlay:[x, y, ...prevState.idsNotInPlay]
                }))
                console.log(temp)
                this.setState({match:true,
                                image1:'',
                                image2:'',
                                cardsInPlay:temp,
                            cardsAreRevealed:false})
            }
            else{
                if(temp[x] !== undefined &&  temp[y] !== undefined){
                //console.log(temp)
                //console.log(temp)
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
             //this.display()

             setTimeout(()=>{this.gameOver()},500)

             //setTimeout(() => {alert('You Won!')}, 750)
            }
             
         }
    }



    handleClick=(e)=>{
        e.preventDefault();
        if(!this.state.gameStart){
            this.setState({timerStart:Date.now(),
                            gameStart:true})
        }
        let index = e.target.id
        this.updateStateOfReveal(index)
    }

    elapsedTime=()=>{
        let seconds = Math.round((this.state.timerEnd-this.state.timerStart)/1000)
        // if(!this.state.timeSet){
        //     this.setState({timeElapsed:seconds,
        //                     timeSet:true})
        // }
        if(seconds>60){
            let minutes = Math.floor(seconds/60)
            let minSeconds = Math.floor(seconds%60)
            return(minutes + " minutes " + minSeconds + " seconds")
        } else {
        return (seconds + ' seconds')
        }
    }

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
        // if((this.state.idsNotInPlay.length === this.state.cardsInPlay.length) && this.state.cardsInPlay.length>1) {
        //    if(!this.state.won){
        //      this.setState({won:true,
        //                     timerEnd:Date.now()})
        //     //this.gameOver()
        //     //setTimeout(() => {alert('You Won!')}, 750)
        //    }
            
        // }

        return(
            <div className='gamePage'>
                <CardMultiplier arrayofcards={this.updateCardsInPlay} onClick={(e)=>this.handleClick(e)} 
                image1={this.state.image1} image2={this.state.image2} notInPlay={this.state.idsNotInPlay} 
                inPlay={this.state.cardsInPlay} stateOfRandomization={this.state.randomized} experience={this.context.cardsForExperienceLevel}/>
                {this.display()}
                {this.state.won ? <h2>You've Won!</h2> : null}
                {(this.state.won && this.context.playerId!=='')? <Link to='/player'><button type='button'>Continue</button></Link>:null}
                {(this.state.won && this.context.playerId==='')? <Link to='/'><button type='button'>Back to Home</button></Link>:null}
            </div>
        )
    }

}

export default Game