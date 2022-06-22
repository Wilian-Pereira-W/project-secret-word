import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

function SignIn() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <form>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Digite o email"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite a senha"
          />
        </label>
        <button type="button">Login</button>
        <button
          className={styles.accountBtn}
          type="button"
          onClick={() => navigate('/register')}
        >
          Ainda não tenho conta
        </button>
      </form>
    </div>
  );
}

export default SignIn;
