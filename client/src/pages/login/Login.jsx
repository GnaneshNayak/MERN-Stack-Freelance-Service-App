import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import './Login.scss';

const Login = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const password = passwordRef.current.value;
      const username = usernameRef.current.value;

      if (username && password) {
        const res = await newRequest.post('auth/login', {
          username,
          password,
        });
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        navigate('/');
      }
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <div className="demo">
          <h4> Demo Accounts </h4>
          <div>
            <p>
              <b>username:</b>test <b>Pass:</b>test123
            </p>
          </div>
        </div>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          ref={usernameRef}
        />
        <label htmlFor="">Password</label>
        <input name="password" type="password" ref={passwordRef} />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
