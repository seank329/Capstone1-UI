import config from '../config.js'

const MemoryApiService = {
    getNames() {
        return fetch(`${config.API_ENDPOINT}/memory-general`, {
            headers: { 
            },
        })
        .then(res => 
            (!res.ok)
            ?res.json().then(e => Promise.reject(e))
            :res.json()
            )
    },
    getHighScores(){
        return fetch(`${config.API_ENDPOINT}/memory-general/high_scores`, {
            headers:{
            },
        })
        .then(res =>
            (!res.ok) ?res.json().then(e => Promise.reject(e)) :res.json ())
    },
    postName(name){
        return fetch(`${config.API_ENDPOINT}/memory-general`, {
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({
                player_name: name,
                total_time_played: `00:00:00`,
            }),
        })
        .then(res =>
            (!res.ok)
            ?res.json().then(e=>Promise.reject(e))
            :res.json()
            )
    }
}

export default MemoryApiService