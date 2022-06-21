import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import styles from './styles.module.scss';

function Game({
  verifyLetter,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) {
  const [letter, setLetter] = useState('');
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter('');
    letterInputRef.current.focus();
  };

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
        {letters.map((letter, index) =>
          guessedLetters.includes(letter) ? (
            <span key={index} className={styles.letter}>
              {letter}
            </span>
          ) : (
            <span keys={index} className={styles.blankSquare}></span>
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
          <span key={index}>{letter}, </span>
        ))}
      </div>
    </div>
  );
}

Game.propTypes = {
  guessedLetters: PropTypes.shape({
    includes: PropTypes.func,
  }),
  guesses: PropTypes.any,
  letters: PropTypes.shape({
    map: PropTypes.func,
  }),
  pickedCategory: PropTypes.any,
  score: PropTypes.string,
  verifyLetter: PropTypes.func,
  wrongLetters: PropTypes.shape({
    map: PropTypes.func,
  }),
};

export default Game;
