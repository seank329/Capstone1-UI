import React from 'react'

/*
    Transport for data needed globally.
*/

const MemoryContext = React.createContext({
    updatePlayerExperienceLevel: () => {},
    updateCardsForExperienceLevel: () => {},
    playerExperienceLevel:'',
    cardsForExperienceLevel:'',
    updateCurrentPlayer: () => {},
    playerName:'',
    updateCurrentPlayerId: ()=> {},
    playerId:'',
})

export default MemoryContext