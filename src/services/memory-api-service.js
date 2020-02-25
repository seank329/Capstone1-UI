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
        return fetch(`${config.API_ENDPOINT}/api/memory-general/${id}`, {
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

    postTimes(id, level, total, isQuickest){
        let experienceLevel = level.toLowerCase()
        return fetch(`${config.API_ENDPOINT}/api/memory-general/${id}`, {
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

    getPlayerStats(id){
        return fetch(`${config.API_ENDPOINT}/api/memory-general/${id}`, {
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