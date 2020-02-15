import React from 'react'

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