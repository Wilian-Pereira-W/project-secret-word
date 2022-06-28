import React, { useCallback, useEffect, useState, useContext } from 'react';
import styles from './styles.module.scss';
import { wordsList } from '../../data/words';
import StartScreen from '../StartScreen';
import Game from '../Game';
import GameOver from '../GameOver';
import AppContext from '../../context/context';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
];

function StartGame() {
  const {
    letters,
    setLetters,
    guessedLetters,
    setGuessedLetters,
    wrongLetters,
    setWrongLetters,
    setPickedCategory,
    setPickedWord,
    setScore,
    guesses,
    setGuesses,
  } = useContext(AppContext);
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const clearLetterState = useCallback(() => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }, [setGuessedLetters, setWrongLetters]);

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterState();
      setGameStage(stages[2].name);
    }
  }, [clearLetterState, guesses]);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  const startGame = useCallback(
    (difficulty) => {
      if (difficulty === 'Fácil') {
        setGuesses(10);
      }
      if (difficulty === 'Médio') {
        setGuesses(7);
      }
      if (difficulty === 'Difícil') {
        setGuesses(5);
      }
      const { word, category } = pickWordAndCategory();

      clearLetterState();

      let wordLetters = word.split('');
      wordLetters = wordLetters.map((l) => l.toLowerCase());
      setPickedWord(word);
      setPickedCategory(category);
      setLetters(wordLetters);

      setGameStage(stages[1].name);
    },
    [
      clearLetterState,
      pickWordAndCategory,
      setGuesses,
      setLetters,
      setPickedCategory,
      setPickedWord,
    ],
  );

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => (actualScore += 100));
      setGuesses((actualGuesses) => actualGuesses + 1);

      startGame();
    }
    if (guessedLetters.length === 0 && uniqueLetters.length === 0) {
      setScore(0);
      setGameStage(stages[0].name);
    }
  }, [guessedLetters, letters, setGuesses, setScore, startGame]);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const retry = () => {
    setScore(0);
    setGuesses(5);
    setGameStage(stages[0].name);
  };

  return (
    <div className={styles.container}>
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  );
}

export default StartGame;
