import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import AppContext from '../../context/context';
import { getLocalStorage } from '../../utils/localStorage';
import styles from './styles.module.scss';

function StartScreen({ startGame }) {
  const { user, setUser, difficulty, setDifficulty } = useContext(AppContext);

  useEffect(() => {
    setUser(getLocalStorage('user'));
  }, [setUser]);

  return (
    <div className={styles.start}>
      <h1>Secret Word</h1>
      <div>
        <span>Olá, {user.nick}</span>
        <p>Escolha a dificuldade</p>
        <div>
          <button
            value="Fácil"
            onClick={({ target }) => setDifficulty(target.value)}
          >
            Fácil
          </button>
          <button
            value="Médio"
            onClick={({ target }) => setDifficulty(target.value)}
          >
            Médio
          </button>
          <button
            value="Difícil"
            onClick={({ target }) => setDifficulty(target.value)}
          >
            Difícil
          </button>
        </div>
      </div>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button type="button" onClick={() => startGame(difficulty)}>
        Começar o jogo
      </button>
    </div>
  );
}

StartScreen.propTypes = {
  startGame: PropTypes.func,
};

export default StartScreen;
