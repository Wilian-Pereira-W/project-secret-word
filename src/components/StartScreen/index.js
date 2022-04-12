import React, { useState } from 'react';
import styles from './styles.module.scss'

function StartScreen( { startGame } ) {
  const [difficulty, setDifficulty] = useState('');
  return (
    <div className={styles.start}>
      <h1>Secret Word</h1>
      <div>
        <p>Escolha a dificuldade</p>
        <div>
          <button
            value="Fácil"
            onClick={({target}) => setDifficulty(target.value)}
          >Fácil</button>
          <button
             value="Médio"
             onClick={({target}) => setDifficulty(target.value)}
          >Médio</button>
          <button
             value="Difícil"
             onClick={({target}) => setDifficulty(target.value)}
          >Difícil</button>
        </div>
      </div>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button
        type="button"
        onClick={() => startGame(difficulty)}
      >
        Começar o jogo
      </button>
    </div>
  );
}

export default StartScreen;