import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    setToken(token);
  };

  return (
    <Container>
      {token ? <Chat token={token} /> : <Login onLogin={handleLogin} />}
    </Container>
  );
}

export default App;