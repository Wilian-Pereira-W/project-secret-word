import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StartGame from '../components/StartGame';
import api from '../services/api';
import { getLocalStorage } from '../utils/localStorage';

function Home() {
  const navigate = useNavigate();
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
  return (
    <div>
      <StartGame />
    </div>
  );
}

export default Home;
