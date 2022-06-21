import React from 'react';
import styles from './styles.module.scss';

function SignIn() {
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
        <button type="button">Ainda não tenho conta</button>
      </form>
    </div>
  );
}

export default SignIn;
