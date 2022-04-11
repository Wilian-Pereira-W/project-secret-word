import React from 'react';
import styles from './styles.module.scss'

function Game({ verifyLetter } ) {
  return (
    <div>
      <h1>Game</h1>
      <button
        type="button"
        onClick={verifyLetter}
      >
        Finalizar jogo
      </button>
    </div>
  );
}

export default Game;
