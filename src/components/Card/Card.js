import React from 'react';
import './Card.css'

class Card extends React.Component{
   
   display=()=>{
      for(let i=0; i < this.props.notInPlay.length; i++) {
          if (this.props.id===this.props.notInPlay[i]){
            console.log('')  
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
                    <div className='cardImage' id={this.props.id}> {this.display()} </div>
                </div>
            </div>
    )
}


}

export default Card