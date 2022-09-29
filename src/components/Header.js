import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../src/context/UserContext';
import { signOut } from '../services/auth';
import setUser from '../components/Auth/Auth';

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  const { user } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  return (
    <nav className="navbar is-success" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <h1 className="navbar-item is-size-4 has-text-light">🛒 Alchemy Shopping 🛒</h1>
        <a
          role="button"
          className={`navbar-burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-list"
          onClick={() => setIsActive((prev) => !prev)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`} id="navbar-list">
        <div className="navbar-end">
          <div className="navbar-item">
            {!user && (
              <div className="buttons">
                <Link className="button is-primary" to="/auth/sign-up">
                  <strong>Sign up</strong>
                </Link>
                <Link className="button is-light" to="/auth/sign-in">
                  <strong>Sign in</strong>
                </Link>
              </div>
            )}
            {user && (
              <>
                <div>hello {user.email}</div>
                <button className="button is-light" onClick={handleLogout}>
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {}
    </nav>
  );
}
