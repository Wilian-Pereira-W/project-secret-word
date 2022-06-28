import PropTypes from 'prop-types';
import React, { useState, useRef, useContext } from 'react';
import AppContext from '../../context/context';
import styles from './styles.module.scss';

function Game({ verifyLetter }) {
  const [letter, setLetter] = useState('');
  const letterInputRef = useRef(null);
  const {
    letters,
    guessedLetters,
    guesses,
    wrongLetters,
    pickedCategory,
    score,
  } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter('');
    letterInputRef.current.focus();
  };

  return (
    <main className={styles.container}>
      <div className={styles.game}>
        <h1>Adivinhe a palavra:</h1>
        <p className={styles.points}>
          <span>Pontuação: {score}</span>
        </p>
        <h3 className={styles.trip}>
          Dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativas</p>
        <div className={styles.wordContainer}>
          {letters.map((letter, index) =>
            guessedLetters.includes(letter) ? (
              <span key={`${index}`} className={styles.letter}>
                {letter}
              </span>
            ) : (
              <span key={`${index * 12}`} className={styles.blankSquare}></span>
            ),
          )}
        </div>
        <div className={styles.letterContainer}>
          <p>Tente adivinhar uma letra da palavra:</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="letter"
              maxLength="1"
              required
              onChange={({ target }) => setLetter(target.value)}
              value={letter}
              ref={letterInputRef}
            />
            <button>Jogar</button>
          </form>
        </div>
        <div className={styles.wrongLettersContainer}>
          <p>Letras já utilizadas:</p>
          {wrongLetters.map((letter, index) => (
            <span key={`${index * 13}`}>{letter}, </span>
          ))}
        </div>
      </div>
    </main>
  );
}

Game.propTypes = {
  verifyLetter: PropTypes.func,
};

export default Game;
