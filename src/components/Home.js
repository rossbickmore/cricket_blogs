import React from 'react';

const Home = ({user}) => (
  <div>
    <h1>Welcome back {user.username}</h1> 
  </div>
);

export default Home;