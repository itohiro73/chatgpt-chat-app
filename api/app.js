const express = require('express');
const mongoose = require('mongoose');

const app = express();

// MongoDBへの接続
mongoose.connect('mongodb://localhost:27017/chatdb', { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// ユーザーのスキーマを定義
const User = mongoose.model('User', require('./models/User'));

// POST /api/login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // メールアドレスとパスワードをチェック
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }

  // ログインに成功したら、トークンを返す
  return res.status(200).send({ token: 'xxx' });
});

// POST /api/messages
app.post('/api/messages', (req, res) => {
  const { token, recipient, message } = req.body;

  // トークンをチェック
  if (token !== 'xxx') {
    return res.status(401).send({ message: 'Invalid token' });
  }

  // メッセージを送信
  return res.status(200).send({ message: 'Message sent' });
});

// サーバーの起動
app.listen(3000, () => console.log('Server started'));

