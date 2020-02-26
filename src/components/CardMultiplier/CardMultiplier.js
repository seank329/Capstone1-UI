import React from 'react';
import Card from '../Card/Card';
import './cardMultiplier.css';


/*
    CarMultiplier function receives the number of cards used for the current level from the 'Game' component,
    and fills an array of 'Card' components in a randomized order for gameplay.
*/

function CardMultiplier(props) {
    
    let cardNumbers = props.experience;
    const cardArray = [];
    let imageArray = [];
    const temp = [];
    const randomizedCards = [];
    let index;

    for(let i=0; i<cardNumbers; i++){
        imageArray.push( i < cardNumbers/2 ? i + 1 : i - (cardNumbers/2) + 1 )
    };

    if (props.stateOfRandomization===false) {
        while(temp.length < cardNumbers){
            index = Math.floor(Math.random()*(cardNumbers))
            if(temp.indexOf(index)===-1){
                temp.push(index)
            }
    }
    for(let i = 0; i < cardNumbers; i++){
        randomizedCards[i]=imageArray[temp[i]]
    }
    imageArray=randomizedCards;    
}
 
    for(let i=0; i < cardNumbers; i++ ){
        cardArray.push({
            id:i,
            cardFaceUp:false,
            image:imageArray[i],
        })
    }

    return(
        <div className='cardsArray' arrayofcards={props.arrayofcards(cardArray)}>
            {cardArray.map((card) => <Card key={card.id} id={card.id} image={imageArray[card.id]} 
            onClick={(e) => props.onClick(e)} reveal={props.reveal} image1={props.image1} image2={props.image2}
            notInPlay={props.notInPlay} inPlay={props.inPlay} />)}
        </div>
    )

}

export default CardMultiplier;