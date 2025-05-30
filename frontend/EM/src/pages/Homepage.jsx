import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' , textAlign: center }}>
      <h1>Welcome to Eventify</h1>
      <p><i>"Your celebration,our dedication..."</i></p>
      <p>Please <Link to="/Login">Login</Link> or <Link to="/Register">Register</Link> to continue.</p>
    </div>
  );
};

export default Homepage;
