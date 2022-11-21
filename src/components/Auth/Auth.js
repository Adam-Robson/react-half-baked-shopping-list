import { NavLink, Redirect, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './Auth.css';
import { useState } from 'react';
import { authUser } from '../../services/auth';
import { useUserContext } from '../../context/useUserContext';

export default function Auth() {
  const { type } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser } = useUserContext();

  const submitAuth = async () => {
    const userResponse = await authUser(email, password, type);
    setUser(userResponse);
    setEmail('');
    setPassword('');
  };

  if (user) {
    return <Redirect to="/Items" />;
  }
  return (
    <div className="auth">
      <nav className="panel">
        <div className="heading">welcome</div>
        <div className="panel">

        </div>
        <div className="box">
          <div className="field">
            <label className="label">email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="icon">
                <FontAwesomeIcon className="icon" icon={faEnvelope} />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="icon">
                <FontAwesomeIcon className="icon" icon={ faLock } />
              </span>
            </div>
          </div>
        </div>
        <div className="control">
          <button onClick={submitAuth} className="submit">
            Submit
          </button>
        </div>
        {
          type === 'sign-in' ?
            <div><NavLink className='link-nav' to='/auth/sign-up'>sign-up instead?</NavLink></div> :
            <div><NavLink className='link-nav' to='/auth/sign-in'>sign-in instead?</NavLink></div>
        }
      </nav>
    </div>
  );
}
