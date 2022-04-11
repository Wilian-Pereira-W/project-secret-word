import React from 'react';
import styles from './styles.module.scss'

function Game({ verifyLetter } ) {
  return (
    <div className={styles.game}>
      <p className={styles.points}>
        <span>Pontuação: 000</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className={styles.trip}>
        Dica sobre a palavra: <span>Dica...</span>
      </h3>
      <div className={styles.wordContainer}>
        <span className={styles.letter}>A</span>
        <span className={styles.blankSquare}></span>
      </div>
      <div>
        <p>Tente adivinhar uma letra da palavra:</p>
        <form>
          <input type="text" name="letter" maxLength="1" required/>
          <button type="button">Jogar</button>
        </form>
      </div>
      <div className={styles.wrongLettersContainer}>
        <p>Letras já utilizadas:</p>
        <span>a,</span>

      </div>

    </div>
  );
}

export default Game;
