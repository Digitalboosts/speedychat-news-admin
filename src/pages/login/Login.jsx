// import "./login.scss"

// const Login = () => {
//   return (
//     <div>Login</div>
//   )
// }

// export default Login


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { setUserRole } from './userSlice';
import { useNavigate } from 'react-router-dom';
import './LoginPage.scss'; // Import CSS file
import { toast } from "react-toastify"
import { getUser, userDetails, userLogin } from '../../redux/allApiCall/action';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() => {
    if (username == '' || password == '') {
      toast("Both fields are required.", {
        position: "bottom-center",
        type: "error",
      });
      return;
    }
    setLoading(true);

    // Simulate a login process (e.g., API call)
    // setTimeout(() => {
      // dispatch({
      //   type: 'user/login',
      //   payload: { role: 'admin', isAuthenticated: true }, // Example for admin login
      // });
      const payload = {
        "email":username,
        "password":password
      }
      const token =await dispatch(userLogin(payload))
      console.log("token", token)
      const userData =await dispatch(userDetails(token.access))
      // const userData =await dispatch(getUser(token.access))
      console.log("userData", userData)
      setLoading(false); // Hide loader
      navigate('/');
    // }, 2000); // Simulate 2-second delay for login
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-form">
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="login-input"
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="login-input"
          required
        />
        <button onClick={handleLogin} className="login-button" disabled={loading}>
          {loading ? <div className="loader"></div> : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
