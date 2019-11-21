import React from 'react'
import './Game.css'
import CardMultiplier from '../CardMultiplier/CardMultiplier'

class Game extends React.Component{

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
            randomized:false
        }
       this.updateCardsInPlay=this.updateCardsInPlay.bind(this)
       this.updateStateOfReveal=this.updateStateOfReveal.bind(this)
    }

    componentDidMount(){
        this.setState({randomized:true})
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
    }



    handleClick=(e)=>{
        e.preventDefault();
        let index = e.target.id
        this.updateStateOfReveal(index)
    }


     render(){
        if(this.state.idsNotInPlay.length === this.state.cardsInPlay.length) {
            setTimeout(() => {alert('You Won!')}, 750)
        }

        return(
            <div className='gamePage'>
                <CardMultiplier arrayofcards={this.updateCardsInPlay} onClick={(e)=>this.handleClick(e)} 
                image1={this.state.image1} image2={this.state.image2} notInPlay={this.state.idsNotInPlay} 
                inPlay={this.state.cardsInPlay} stateOfRandomization={this.state.randomized} experience={this.props.experience}/>
            </div>
        )
    }

}

export default Game