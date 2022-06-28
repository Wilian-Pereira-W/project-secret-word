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
  const [showPassword, setShowPassword] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };

    api
      .post('login', data)
      .then((data) => {
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

  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
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
            type={showPassword ? 'password' : 'text'}
            name="password"
            id="password"
            placeholder="Digite a senha"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <button
          className={styles.btnIcons}
          type="button"
          onClick={() => handleShowPassword()}
        >
          <i className="bi bi-eye-slash-fill" />
        </button>
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
