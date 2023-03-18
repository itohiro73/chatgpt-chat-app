import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function Chat({ token }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io.connect('/');
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get('/api/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    };
    fetchMessages();
  }, [token]);

  useEffect(() => {
    if (!socket) return;
    socket.on('new message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages, socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('new message', message);
    setMessage('');
  };

  return (
    <div>
      <div style={{ height: '400px', overflowY: 'scroll' }}>
        {messages.map((m) => (
          <div key={m._id}>
            {m.user.email}: {m.message}
          </div>
        ))}
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="message">
          <Form.Control
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </div>
  );
}

export default Chat;
