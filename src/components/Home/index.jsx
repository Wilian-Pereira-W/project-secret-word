import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { wordsList } from '../../data/words';
import StartScreen from '../StartScreen';
import Game from '../Game';
import GameOver from '../GameOver';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
];

function Home() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const clearLetterState = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterState();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

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
        setGuesses(7);
      } else if (difficulty === 'Médio') {
        setGuesses(5);
      } else {
        setGameStage(3);
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
    [pickWordAndCategory],
  );

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => (actualScore += 100));
      setGuesses((actualGuesses) => actualGuesses + 3);

      startGame();
    }
    if (guessedLetters.length === 0 && uniqueLetters.length === 0) {
      setScore(0);
      setGameStage(stages[0].name);
    }
  }, [guessedLetters, letters, startGame]);

  const verifyLetter = (letter) => {
    // setGameStage(stages[2].name);

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
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  return (
    <div className={styles.container}>
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default Home;