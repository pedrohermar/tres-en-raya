import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { TURNS, INITIAL_STATE } from './constantes.js'
import { WinnerModal } from './components/WinnerModal'
import { checkWinner } from './logic/checkWinner'
import { saveGameStorage, resetGameStorage } from './logic/gameStorage'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null) // null si no hay ganador | false si hay empate


  const updateBoard = (index) => {
    // No actualizamos si ya hay token en esa casilla o si ya hay un ganador
    if (board[index] || winner) return
    
    // Se actualiza el tablero con la nueva jugada
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Cambio de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Guardar la partida en el localStorage
    saveGameStorage( newBoard, newTurn )

    // Se comprueba si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
      return

    // Se comprueba si hay empate comprobando que hay token en todas las casillas y no hay ganador
    } else if (!newBoard.includes(null)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(INITIAL_STATE)
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  return (
    <main className='board'>
      <h1>Tres en Raya</h1>
      <button onClick={resetGame}>Reiniciar Partida</button>
      <section className='game'>
        {
          board.map(( token , index ) => {
            return (
              <Square 
                key={index} 
                index={index}
                updateBoard={updateBoard}
              >
                {token}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />      
              
    </main>
  )
}

export default App
