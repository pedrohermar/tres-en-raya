import { WINNER_COMBOS } from "../constantes"

export  const checkWinner = (boardToCheck) => {
    // Se revisan todas las combinaciones ganadoras para comprobar si hay un ganador
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
  }