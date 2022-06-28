import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './context';

function Provider({ children }) {
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [score, setScore] = useState(0);
  const [user, setUser] = useState('');
  const [guesses, setGuesses] = useState(5);
  const [difficulty, setDifficulty] = useState('');

  const contextValue = {
    letters,
    setLetters,
    guessedLetters,
    setGuessedLetters,
    wrongLetters,
    setWrongLetters,
    pickedWord,
    setPickedWord,
    pickedCategory,
    setPickedCategory,
    score,
    setScore,
    user,
    setUser,
    guesses,
    setGuesses,
    difficulty,
    setDifficulty,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
