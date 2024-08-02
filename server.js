const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));

// Conecte-se ao MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://leofreitaslutaif:J7XIvuHB4imV8USj@e-rest-data-base.dnjy5kn.mongodb.net/?retryWrites=true&w=majority&appName=E-Rest-Data-Base';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Defina um esquema e modelo de usuário
const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
  userData: {
    nomeCompleto: String,
    telefone: String,
    cpf: String,
    dataNascimento: Date,
  },
  processData: {
    numeroProcesso: String,
  },
  // Adicione outros campos conforme necessário
});

const User = mongoose.model('User', userSchema);

// Rota para obter todos os usuários
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Rota para obter um usuário específico pelo ID
app.get('/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await User.findOne({ id: userId });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Rota para criar um novo usuário
app.post('/users', async (req, res) => {
  try {
    const users = await User.find();
    const newUser = req.body;
    newUser.id = users.length ? users[users.length - 1].id + 1 : 1;

    const user = new User(newUser);
    await user.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Rota para atualizar um usuário existente
app.put('/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const updatedUser = req.body;

  try {
    const user = await User.findOneAndUpdate({ id: userId }, updatedUser, { new: true });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Rota para deletar um usuário
app.delete('/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await User.findOneAndDelete({ id: userId });

    if (user) {
      res.status(200).send({ message: 'User deleted successfully' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Função de verificação de senha (exemplo simples)
const verifyPassword = (password) => {
  const correctPassword = 'your-password'; // Substitua pela lógica de verificação real
  return password === correctPassword;
};

// Rota para verificar a senha
app.post('/verify-password', (req, res) => {
  const { password } = req.body;
  if (verifyPassword(password)) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect password' });
  }
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
