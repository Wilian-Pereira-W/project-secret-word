import PropTypes from 'prop-types';
import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/context';
import api from '../../services/api';
import { removeItem } from '../../utils/localStorage';
import styles from './styles.module.scss';

function GameOver({ retry }) {
  const { score, user, difficulty } = useContext(AppContext);
  const navigate = useNavigate();

  const add = useCallback(() => {
    const data = {
      score,
      difficulty,
      authorId: user.sub,
    };
    const config = {
      headers: { Authorization: `Bearer ${user.access_token}` },
    };

    api
      .post('score', data, config)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [difficulty, score, user.access_token, user.sub]);

  const playAgain = () => {
    add();
    retry();
  };

  const leaveTheGame = () => {
    add();
    removeItem('user');
    navigate('/login');
  };
  return (
    <div className={styles.container}>
      <h1>Fim de jogo</h1>
      <h2>
        {user.nick} sua pontuação foi: <span>{score}</span>
      </h2>
      <button type="button" onClick={() => playAgain()}>
        Resetar jogo
      </button>
      <button type="button" onClick={() => leaveTheGame()}>
        Sair do Jogo
      </button>
    </div>
  );
}

GameOver.propTypes = {
  retry: PropTypes.func,
};

export default GameOver;
