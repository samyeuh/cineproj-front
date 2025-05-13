import React, { useState } from 'react';
import { login, register } from '../../api/auth.ts';
import './Sign.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.tsx';

const Sign: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login: loginContext } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${mode === 'login' ? 'Login' : 'Register'} with`, { username, password });
    if (mode == 'login') {
      const res = await login({ username, email, password });
      loginContext({
        username,
        email: res.email || undefined,
        token: res.token,
      })
      navigate('/');
    } else if (mode == 'register') {
      register({ username, email, password });
      setMode('login');
    } else {
      console.error('Unknown mode');
    }
  };

  return (
    <div className="sign-container">
      <h2 className="sign-title">
        {mode === 'login' ? 'Connectez-vous' : "S'inscire"}
      </h2>

      <form className="sign-form" onSubmit={handleSubmit}>
        <label>
          Nom d'utilisateur
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            placeholder="superadmin"
          />
        </label>

        {mode === 'register' && (
          <label>
            Adresse e-mail
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="salim@efrei.fr"
            />
          </label>
        )}

        <label>
          Mot de passe
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </label>

        <button type="submit">
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      <p className="sign-switch">
        {mode === 'login' ? "Vous n'avez pas de compte ?" : 'Vous avez déjà un compte ?'}{' '}
        <span onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? "S'inscire" : 'Se connecter'}
        </span>
      </p>
    </div>
  );
};

export default Sign;
