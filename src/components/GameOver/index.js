import React from 'react';
import styles from './styles.module.scss'

function GameOver( { retry } ) {
  return (
    <div>
      <h1>Game Over</h1>
      <button
        type="button"
        onClick={retry}
      >
        Resetar jogo
      </button>
    </div>
  );
}

export default GameOver;
