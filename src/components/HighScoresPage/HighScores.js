import React from 'react'
import MemoryApiService from '../../services/memory-api-service'

class HighScores extends React.Component{

    componentDidMount(){
        MemoryApiService.getHighScores()
            .then(res => console.log(res))
            .catch({error:'Something went wrong here'})
    }
    
    render(){
    
        return(
            <div className = 'HighScores'>

            </div>
        )

    }

}

export default HighScores