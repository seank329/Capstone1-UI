import React from 'react';
import './card.css'


/*
    The Card Component is the container for each individual card used in gameplay.  The Card Component is 
    left as class for possible future implementation of animations where state is required.
*/ 

class Card extends React.Component{

  // Default image is a card number
   display=()=>{
      for(let i=0; i < this.props.notInPlay.length; i++) {
          if (this.props.id===this.props.notInPlay[i]){ 
            return this.props.inPlay[this.props.id].image
          }
      } 
      if(this.props.id === this.props.image1.id){
           return this.props.image1.image
       } else if (this.props.id === this.props.image2.id)
            return this.props.image2.image
   }
   
    render(){
        return(
                <div className='cardContainer' id={this.props.id}>
                    <div className='card' onClick={(e)=>this.props.onClick(e)} id={this.props.id}>
                        <div className='cardImage' id={this.props.id}> <h1>{this.display()}</h1> </div>
                    </div>
                </div>
        )
    }


}

export default Card