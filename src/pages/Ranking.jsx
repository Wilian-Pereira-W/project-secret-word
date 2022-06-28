import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { getLocalStorage, removeItem } from '../utils/localStorage';
import styles from '../styles/styles.module.scss';
import { useNavigate } from 'react-router-dom';

function Ranking() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const user = getLocalStorage('user');
    const config = {
      headers: { Authorization: `Bearer ${user.access_token}` },
    };
    api
      .get('ranking', config)
      .then((data) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const user = getLocalStorage('user');
    const config = {
      headers: { Authorization: `Bearer ${user.access_token}` },
    };
    api
      .get('me', config)
      .then()
      .catch(() => {
        navigate('/login');
      });
  }, [navigate]);

  const exit = () => {
    removeItem('user');
    navigate('/login');
  };

  return (
    <main className={styles.container}>
      <table>
        <caption>Classificação Geral</caption>
        <thead>
          <tr>
            <th>Posição</th>
            <th>Pontuação</th>
            <th>Nick</th>
            <th>Dificuldade</th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort(function (a, b) {
              return b.scores[0].score - a.scores[0].score;
            })
            .map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}°</td>
                <td>{user.scores[0].score.toFixed(2)}</td>
                <td>{user.nick}</td>
                <td>{user.scores[0].difficulty}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <section>
        <button type="button" onClick={() => navigate('/game')}>
          Jogar Novamente
        </button>
        <button type="button" onClick={() => exit()}>
          Sair do Jogo
        </button>
      </section>
    </main>
  );
}

export default Ranking;
