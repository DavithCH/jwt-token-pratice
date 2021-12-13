const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());

const posts = [
  {
    username: 'Davith',
    title: 'Post 1',
  },
  {
    username: 'Jackson',
    title: 'Post 2',
  },
];

app.get('/posts', authenticateToken, (req, res) => {
  console.log(req.body);
  res.json(posts.filter((post) => post.username === req.body.username));
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader ? authHeader.split(' ')[1] : null;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(5000, () => console.log('listening on port 5000'));
