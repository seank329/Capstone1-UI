import TokenService from '../services/token-service'
import config from '../config.js'

const MemoryApiService = {
    // Route for setting up a player's default statistics
    setupNewPlayer(id){
        return fetch(`${config.API_ENDPOINT}/api/memory-general/player/${id}`, {
            method:'POST',
            headers: { 
                'authorization':`bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => 
            (!res.ok)
            ?res.json().then(e => Promise.reject(e))
            :res.json()
            )   
    },

    // Route for posting times if quickest, as well as updating games played and total time played
    postTimes(id, level, total, isQuickest){
        let experienceLevel = level.toLowerCase()
        return fetch(`${config.API_ENDPOINT}/api/memory-general/player/${id}`, {
            method: 'PUT',
            headers:{
                'content-type':'application/json',
                'authorization':`bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                player_id:id,
                experience: experienceLevel,
                total_time_played:total,
                is_quickest:isQuickest
            }),
        })
        .then(res =>
            (!res.ok)
            ?res.json().then(e=>Promise.reject(e))
            :res.json()
            )
    },

    // Route for acquiring player statistics
    getPlayerStats(id){
        return fetch(`${config.API_ENDPOINT}/api/memory-general/player/${id}`, {
            headers: { 
                'authorization':`bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => 
            (!res)
            ?res.json().then(e => Promise.reject(e))
            :res.json()
            )
        },

    // Route for getting high scores at each difficulty level. Public access
    getHighScores(level){
            return fetch(`${config.API_ENDPOINT}/api/memory-general/experience/${level}`, {
                // headers: { 
                //     'authorization':`bearer ${TokenService.getAuthToken()}`
                // },
            })
            .then(res => 
                (!res)
                ?res.json().then(e => Promise.reject(e))
                :res.json()
                )   
    },

    
}

export default MemoryApiService