import React from 'react'
import { Link } from 'react-router-dom';
import './NewCharacter.css'
//import TokenService from '../../services/token-service'
import MemoryApiService from '../../services/memory-api-service'


class NewCharacter extends React.Component {

    constructor(props){
    super(props);
        this.state = {
        currentNames:[],
        currentPlayer:'',
        namesSet:false
    };

    }
    
    // componentDidMount () {
    //        MemoryApiService.getNames()
    //             .then(res => this.setState({currentNames:res}))
    //             .catch({error:'Something went wrong here'})
    // }

    handleClick=(e)=>{
        e.preventDefault();
        this.props.changePage('experienceLevelPage');
    }

    handleGuestAccess=()=>{
        this.setState({currentPlayer:'Guest'})
    }

    handleLogin=(e)=>{
        console.log(e.target.value)
        this.props.changePage('loginPage')
    }

    // loggedIn=()=>{
    //     const { history } = this.props
    //     history.push('/experience')
    // }

    // display=()=>{
    //     if(TokenService.hasAuthToken()){
    //         this.loggedIn()
    //     } else {
    //         return(
    //             <form>
    //             <h2> Would You Like To Continue as Guest or.. :</h2>
    //             {/* <button type='button' onChange={e => this.handleGuestAccess()}></button> */}
    //             <Link to='/experience'>
    //                 <button type='button' /*onClick={this.handleClick}*/>Continue As Guest</button>
    //             </Link>
    //             <h2> .. Continue From a Previous Character? </h2>
    //             <Link to='/login'>
    //                 <button type='button' /*onClick={this.handleLogin}*/> Login </button>
    //             </Link>   
    //             </form>
    //         )
    //     }
    // }

    render(){
        const namesList=this.state.currentNames.map(names=> <option key={names.id}>{names.name}</option>)
        let showNames = [];
         if (this.state.currentNames.length > 0){
             showNames = this.state.currentNames.map(names => <option key={names.name} value={names.name}>{names.name}</option>)
            //console.log(showNames)
        }
        return(
            <div className='newCharacterScreen'>
                <form>
                <h2> Would You Like To Continue as Guest or.. </h2>
                {/* <button type='button' onChange={e => this.handleGuestAccess()}></button> */}
                <Link to='/experience'>
                    <button type='button' /*onClick={this.handleClick}*/>Continue As Guest</button>
                </Link>
                <h2> .. Continue From a Previous Character? </h2>
                <Link to='/login'>
                    <button type='button' /*onClick={this.handleLogin}*/> Login </button>
                </Link>   
                </form>
            </div>
        )
    }
}

export default NewCharacter