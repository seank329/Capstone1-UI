import React from 'react';
import { Link } from 'react-router-dom';
import './newCharacter.css';

/*
    The 'NewCharacter' component renders a display shown generally after the landing page if the user 
    is not logged in, and allows the user to continue to play the game as a guest, or allow the user to login.
*/
class NewCharacter extends React.Component {

    constructor(props){
        super(props);
            this.state = {
            currentNames:[],
            currentPlayer:'',
            namesSet:false
        };
    };

    // Continue as a guest and to the experience level page
    handleGuestAccess=()=>{
        this.setState({currentPlayer:'Guest'});
    };

    // Display shows links for playing the game as a guest, or logging in
    render(){
        return(
            <div className='newCharacterScreen'>
                <form>
                <h2> Would You Like To Continue as a Guest ?</h2>
                <Link to='/experience'>
                    <button type='button' id='guestButton'>Just Play!</button>
                </Link>
                <h2> .. Continue From a Previous Character? </h2>
                <Link to='/login'>
                    <button type='button'> Login / Register </button>
                </Link>   
                </form>
                <h5>By registering and logging in, you get to save your progress!</h5>
            </div>
        );
    };
};

export default NewCharacter;