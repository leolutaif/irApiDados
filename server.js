const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

const getUsers = () => {
  const data = fs.readFileSync('db.json');
  return JSON.parse(data).users;
};

const saveUsers = (users) => {
  const data = { users };
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
};

// Simulação de verificação de senha (você pode implementar sua lógica de autenticação aqui)
const verifyPassword = (password) => {
  // Substitua 'your-secret-password' pela senha real
  const correctPassword = 'your-secret-password';
  return password === correctPassword;
};

app.get('/users', (req, res) => {
  const users = getUsers();
  res.json(users);
});

app.post('/users', (req, res) => {
  const users = getUsers();
  const newUser = req.body;
  newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push(newUser);
  saveUsers(users);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const updatedUser = req.body;
  let users = getUsers();

  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = updatedUser;
    saveUsers(users);
    res.json(updatedUser);
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  let users = getUsers();

  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    saveUsers(users);
    res.status(200).send({ message: 'User deleted successfully' });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

app.post('/verify-password', (req, res) => {
  const { password } = req.body;
  if (verifyPassword(password)) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect password' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
