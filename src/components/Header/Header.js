import { useState } from 'react';
import { useUserContext } from '../../context/useUserContext';
import { signOut } from '../../services/auth';

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const { user, setUser } = useUserContext();
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
    <nav className="navbar-nav" role="navigation" aria-label="main navigation">
      <div className="navbar-container">
        <h1 className="navbar-title">shopping<br />things<br />list</h1>
        <a
          role="button"
          className={ `navbar-burger ${isActive ? 'is-active' : ''}` }
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-list"
          onClick={ () => setIsActive((prev) => !prev) }
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className="navbar-item">
        { user && (
          <>
            <button className="button" onClick={ handleLogout }>
                  Sign Out
            </button>
            <div className="greeting">hello { user.email }</div>

          </>
        ) }
      </div>
    </nav>
  );
}
