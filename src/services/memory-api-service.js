import TokenService from '../services/token-service'
import config from '../config.js'

const MemoryApiService = {
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

    
}

export default MemoryApiService