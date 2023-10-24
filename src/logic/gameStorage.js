const saveGameStorage = ( newBoard, newTurn ) => {
    localStorage.setItem('board', JSON.stringify(newBoard))
    localStorage.setItem('turn', newTurn)
}

const resetGameStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}

export { 
    saveGameStorage,
    resetGameStorage
}