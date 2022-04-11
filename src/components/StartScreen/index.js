import React from 'react';
import styles from './styles.module.scss'

function StartScreen() {
  return (
    <div className={styles.start}>
      <h1>Secret Word</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button>Começar o jogo</button>
    </div>
  );
}

export default StartScreen;