import config from '../config'

// Basic authentication with Base64 encoding. Important for sending credentials with API calls
const TokenService = {
    saveAuthToken(token){
        window.localStorage.setItem(config.TOKEN_KEY, token)
    },
    getAuthToken(){
        return window.localStorage.getItem(config.TOKEN_KEY)
    },
    clearAuthToken(){
        window.localStorage.removeItem(config.TOKEN_KEY)
    },
    hasAuthToken(){
        return !!TokenService.getAuthToken()
    },
    makeBasicAuthToken(user_name, password){
        return window.btoa(`${user_name}:${password}`)
    },
}

export default TokenService