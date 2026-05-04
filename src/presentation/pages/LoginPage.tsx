import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, setAuthenticated } from '../../routes/RequireAuth';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');

  .login-root {
    min-height: 100vh;
    background: #0a0908;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
    font-family: 'DM Sans', sans-serif;
  }

  .login-brand {
    text-align: center;
    margin-bottom: 48px;
  }
  .login-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.8rem;
    font-weight: 300;
    color: #c9a84c;
    letter-spacing: 0.18em;
    line-height: 1;
  }
  .login-brand-line {
    width: 24px;
    height: 1px;
    background: #c9a84c;
    margin: 12px auto 0;
  }
  .login-brand-sub {
    display: block;
    font-size: 0.62rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #3a3530;
    margin-top: 8px;
  }

  .login-card {
    width: 100%;
    max-width: 380px;
    border: 1px solid rgba(201,168,76,0.18);
    padding: 40px 36px;
    background: #0e0d0b;
    position: relative;
  }

  .login-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: rgba(201,168,76,0.3);
    border-style: solid;
  }
  .login-corner-tl { top: -1px; left: -1px;   border-width: 1px 0 0 1px; }
  .login-corner-tr { top: -1px; right: -1px;  border-width: 1px 1px 0 0; }
  .login-corner-bl { bottom: -1px; left: -1px; border-width: 0 0 1px 1px; }
  .login-corner-br { bottom: -1px; right: -1px;border-width: 0 1px 1px 0; }

  .login-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 300;
    color: #f0ece2;
    margin-bottom: 4px;
    line-height: 1;
  }
  .login-subtitle {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #3a3530;
    margin-bottom: 32px;
  }

  .login-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
  }
  .login-field label {
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #5a5040;
    margin-bottom: 6px;
  }
  .login-field input {
    background: #0a0908;
    border: 1px solid rgba(201,168,76,0.12);
    color: #e8e4dc;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 11px 14px;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }
  .login-field input:focus {
    border-color: rgba(201,168,76,0.45);
  }
  .login-field input::placeholder {
    color: #2a2520;
    font-size: 13px;
  }

  .login-forgot {
    font-size: 10px;
    letter-spacing: 0.1em;
    color: #3a3530;
    text-align: right;
    margin-bottom: 24px;
    margin-top: -8px;
    cursor: pointer;
    transition: color 0.2s;
    background: none;
    border: none;
    width: 100%;
  }
  .login-forgot:hover { color: #c9a84c; }

  .login-btn {
    width: 100%;
    background: #c9a84c;
    border: none;
    color: #0a0908;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 13px;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .login-btn:hover:not(:disabled) { background: #d4b86a; }
  .login-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .login-error {
    font-size: 11px;
    color: #c06050;
    margin-bottom: 12px;
    letter-spacing: 0.04em;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) navigate('/dashboard', { replace: true });
  }, [navigate]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Completa correo y contraseña');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setAuthenticated(true);
      navigate('/dashboard', { replace: true });
    }, 800);
  }

  return (
    <>
      <style>{css}</style>
      <div className="login-root">

        <div className="login-brand">
          <div className="login-logo">Rével</div>
          <div className="login-brand-line" />
          <span className="login-brand-sub">Gestión de eventos</span>
        </div>

        <form className="login-card" onSubmit={handleLogin} noValidate>
          <div className="login-corner login-corner-tl" />
          <div className="login-corner login-corner-tr" />
          <div className="login-corner login-corner-bl" />
          <div className="login-corner login-corner-br" />

          <h1 className="login-title">Bienvenido</h1>
          <p className="login-subtitle">Accede a tu cuenta</p>

          <div className="login-field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button type="button" className="login-forgot">
            ¿Olvidaste tu contraseña?
          </button>

          {error && <p className="login-error">{error}</p>}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24"
                  stroke="currentColor" fill="none" strokeWidth="2"
                  style={{ animation: 'spin 0.8s linear infinite' }}>
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                Entrando…
              </>
            ) : 'Entrar'}
          </button>
        </form>

      </div>
    </>
  );
}