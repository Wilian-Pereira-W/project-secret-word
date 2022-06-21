import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';

function GameOver({ retry, score }) {
  return (
    <div className={styles.container}>
      <h1>Fim de jogo</h1>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <button type="button" onClick={retry}>
        Resetar jogo
      </button>
    </div>
  );
}

GameOver.propTypes = {
  retry: PropTypes.string,
  score: PropTypes.string,
};

export default GameOver;
