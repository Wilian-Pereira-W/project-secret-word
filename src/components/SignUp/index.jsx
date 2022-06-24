import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import api from '../../services/api';
import {
  validateName,
  validateEmail,
  validatePassword,
  validateNick,
} from '../../utils/validateRegister';

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nick, setNick] = useState('');
  const [errorName, setErrorName] = useState([]);
  const [errorNick, setErrorNick] = useState([]);
  const [errorEmail, setErrorEmail] = useState([]);
  const [errorPassword, setErrorPassword] = useState([]);
  const [existUser, setExistUser] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      email,
      password,
      nick,
    };

    api
      .post('user/register', data)
      .then((data) => {
        console.log(data);
        setName('');
        setEmail('');
        setPassword('');
        setNick('');
        navigate('/login');
      })
      .catch((err) => {
        if (typeof err.response.data.message === 'object') {
          const errName = validateName(err.response.data.message);
          setErrorName(errName);

          const errEmail = validateEmail(err.response.data.message);
          setErrorEmail(errEmail);

          const errPassword = validatePassword(err.response.data.message);
          setErrorPassword(errPassword);

          const errNick = validateNick(err.response.data.message);
          setErrorNick(errNick);
        } else {
          setErrorName([]);
          setErrorEmail([]);
          setErrorPassword([]);
          setErrorNick([]);
          setExistUser(err.response.data.message);
        }
      });
  };

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
          {errorName.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </label>
        <label htmlFor="email">
          Email
          <input
            type="txt"
            name="email"
            id="email"
            placeholder="Digite o email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          {errorEmail.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="txt"
            name="password"
            id="password"
            placeholder="Digite a senha"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          {errorPassword.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
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
          {errorNick.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </label>
        <button type="submit">Registrar</button>
      </form>
      <span>{existUser}</span>
    </div>
  );
}

export default SignUp;
