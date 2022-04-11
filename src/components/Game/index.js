import React from 'react';
import styles from './styles.module.scss'

function Game({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score } ) {
  return (
    <div className={styles.game}>
      <p className={styles.points}>
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className={styles.trip}>
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas</p>
      <div className={styles.wordContainer}>
        {letters.map((letter, index) => (
          guessedLetters.includes(letter) ? (
            <span key={index} className={styles.letter}>{letter}</span>
          ) :
          (
          <span keys={index} className={styles.blankSquare}></span>
          )
        ))}
      </div>
      <div className={styles.letterContainer}>
        <p>Tente adivinhar uma letra da palavra:</p>
        <form>
          <input type="text" name="letter" maxLength="1" required/>
          <button type="button">Jogar</button>
        </form>
      </div>
      <div className={styles.wrongLettersContainer}>
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, index) => (
          <span key={index}>{letter}, </span>
        ))}
      </div>

    </div>
  );
}

export default Game;
