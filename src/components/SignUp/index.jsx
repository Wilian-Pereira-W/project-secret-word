import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import {
  validateEmail,
  validateName,
  validatePassword,
  validateNick,
} from '../../utils/validateRegister';
import api from '../../services/api';

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nick, setNick] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      email,
      password,
      nick,
    };

    api
      .post('user', data)
      .then((data) => {
        console.log(data);
        setName('');
        setEmail('');
        setPassword('');
        setNick('');
        navigate('/login');
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        console.log('oi');
      });
  };

  const enableButton = useCallback(() => {
    if (
      validateName(name) &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateNick(nick)
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [name, email, password, nick]);

  useEffect(() => {
    enableButton();
  }, [name, email, password, nick, enableButton]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome
          <input
            type="txt"
            name="nome"
            id="nome"
            placeholder="Digite o nome"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Digite o email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite a senha"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <label htmlFor="nick">
          Nick
          <input
            type="txt"
            name="nick"
            id="nick"
            placeholder="Digite o nick"
            value={nick}
            onChange={({ target }) => setNick(target.value)}
          />
        </label>
        <button disabled={!isDisabled} type="submit">
          Registrar
        </button>
      </form>
      <span>{errorMessage}</span>
    </div>
  );
}

export default SignUp;
