import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { setLocalStorage } from '../../utils/localStorage';
import styles from './styles.module.scss';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };

    api
      .post('login', data)
      .then((data) => {
        console.log(data);
        setLocalStorage('user', data.data);
        setEmail('');
        setPassword('');
        setErrorMessage('');
        navigate('/game');
      })
      .catch((err) => {
        if (err.response.data.statusCode === 400) {
          setErrorMessage(err.response.data.message[0]);
        }
        if (err.response.data.statusCode === 401) {
          setErrorMessage(err.response.data.message);
        }
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input
            type="txt"
            name="email"
            id="email"
            placeholder="Digite o email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite a senha"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <button type="submit">Login</button>
        <button
          className={styles.accountBtn}
          type="button"
          onClick={() => navigate('/register')}
        >
          Ainda não tenho conta
        </button>
      </form>
      <span>{errorMessage}</span>
    </div>
  );
}

export default SignIn;
