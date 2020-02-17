import TokenService from '../services/token-service'
import config from '../config.js'

const MemoryApiService = {
    postGamesPlayed(id) {
        return fetch(`${config.API_ENDPOINT}/api/memory-general/games_played/${id}`, {
            headers: { 
                'authorization':`bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res =>
            (!res.ok)
            ?res.json().then(e=>Promise.reject(e))
            :res.json()
            )
    },

    setupNewPlayer(id){
        return fetch(`${config.API_ENDPOINT}/api/memory-general/setup/${id}`, {
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

    getQuickTime(id, level){
        return fetch(`${config.API_ENDPOINT}/api/memory-general/get_quickest_time/${id}/${level}`, {
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

    postQuickestGame(id, level, time){
        let experienceLevel = level.toLowerCase()
        return fetch(`${config.API_ENDPOINT}/api/memory-general/post_quickest`, {
            method: 'POST',
            headers:{
                'content-type':'application/json',
                'authorization':`bearer ${TokenService.getAuthToken()}`
            },
            
            body: JSON.stringify({
                player_id: id,
                experience: experienceLevel,
                quickest_time: time,
            }),
        })
        .then(res =>
            (!res.ok)
            ?res.json().then(e=>Promise.reject(e))
            :res.json()
            )
    },

    postTotalTimePlayed(time, id){
        return fetch(`${config.API_ENDPOINT}/api/memory-general/total_time`, {
            method: 'POST',
            headers:{
                'content-type':'application/json',
                'authorization':`bearer ${TokenService.getAuthToken()}`
            },
            
            body: JSON.stringify({
                total_time_played: time,
                player_id: id
            }),
        })
        .then(res =>
            (!res.ok)
            ?res.json().then(e=>Promise.reject(e))
            :res.json()
            )
    },
    
    getPlayerId(player){
        return fetch(`${config.API_ENDPOINT}/api/users/get_id/${player}`, {
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

    getPlayerStats(player){
        try{
        return fetch(`${config.API_ENDPOINT}/api/memory-general/player_stats/${player}`, {
            headers: { 
                'authorization':`bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(data => 
            (!res.ok)
            ?res.json().then(e => Promise.reject(e))
            :res.json(data)
            )
        }catch(error){
           console.log(error)
        }
    },

    getHighScoresBeginner(){
        return fetch(`${config.API_ENDPOINT}/api/memory-general/high_scores/beginner`, {
            // headers: { 
            //     'authorization':`bearer ${TokenService.getAuthToken()}`
            // },
        })
        .then(res => 
            (!res.ok)
            ?res.json().then(e => Promise.reject(e))
            :res.json()
            )   
    },
    getHighScoresEasy(){
        return fetch(`${config.API_ENDPOINT}/api/memory-general/high_scores/easy`, {
            // headers: { 
            //     'authorization':`bearer ${TokenService.getAuthToken()}`
            // },
        })
        .then(res => 
            (!res.ok)
            ?res.json().then(e => Promise.reject(e))
            :res.json()
            )   
    },
    getHighScoresMedium(){
        return fetch(`${config.API_ENDPOINT}/api/memory-general/high_scores/medium`, {
            // headers: { 
            //     'authorization':`bearer ${TokenService.getAuthToken()}`
            // },
        })
        .then(res => 
            (!res.ok)
            ?res.json().then(e => Promise.reject(e))
            :res.json()
            )   
    },
    getHighScoresHard(){
        return fetch(`${config.API_ENDPOINT}/api/memory-general/high_scores/hard`, {
            // headers: { 
            //     'authorization':`bearer ${TokenService.getAuthToken()}`
            // },
        })
        .then(res => 
            (!res.ok)
            ?res.json().then(e => Promise.reject(e))
            :res.json()
            )   
    },
    getHighScoresExpert(){
        return fetch(`${config.API_ENDPOINT}/api/memory-general/high_scores/expert`, {
            // headers: { 
            //     'authorization':`bearer ${TokenService.getAuthToken()}`
            // },
        })
        .then(res => 
            (!res.ok)
            ?res.json().then(e => Promise.reject(e))
            :res.json()
            )   
    },
}

export default MemoryApiService