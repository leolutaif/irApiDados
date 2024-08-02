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
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://leofreitaslutaif:J7XIvuHB4imV8USj@erestapi.mckezcw.mongodb.net/?retryWrites=true&w=majority&appName=eRestApi';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Defina um esquema e modelo de usuário
const userSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  userData: {
    nomeCompleto: String,
    email: String,
    telefone: String,
    cpf: String,
    dataNascimento: String,
  },
  processData: {
    numeroProcesso: String,
    comarca: String,
    vara: String,
  },
  valueData: {
    brutoHomologado: String,
    tributavelHomologado: String,
    numeroMeses: String,
    alvara1: String,
    alvara2: String,
    alvara3: String,
    alvara4: String,
    alvara5: String,
    alvara6: String,
    alvara7: String,
    alvara8: String,
    alvara9: String,
    alvara10: String,
    darf1: String,
    darf2: String,
    darf3: String,
    darf4: String,
    darf5: String,
    darf6: String,
    darf7: String,
    darf8: String,
    darf9: String,
    darf10: String,
    honorarios1: String,
    honorarios2: String,
    honorarios3: String,
    honorarios4: String,
    honorarios5: String,
    honorarios6: String,
    honorarios7: String,
    honorarios8: String,
    honorarios9: String,
    honorarios10: String,
    alvara1Data: String,
    alvara2Data: String,
    alvara3Data: String,
    alvara4Data: String,
    alvara5Data: String,
    alvara6Data: String,
    alvara7Data: String,
    alvara8Data: String,
    alvara9Data: String,
    alvara10Data: String,
    darf1Data: String,
    darf2Data: String,
    darf3Data: String,
    darf4Data: String,
    darf5Data: String,
    darf6Data: String,
    darf7Data: String,
    darf8Data: String,
    darf9Data: String,
    darf10Data: String,
    honorarios1Data: String,
    honorarios2Data: String,
    honorarios3Data: String,
    honorarios4Data: String,
    honorarios5Data: String,
    honorarios6Data: String,
    honorarios7Data: String,
    honorarios8Data: String,
    honorarios9Data: String,
    honorarios10Data: String,
    indice1: String,
    indice2: String,
    indice3: String,
    indice4: String,
    indice5: String,
    indice6: String,
    indice7: String,
    indice8: String,
    indice9: String,
    indice10: String,
    anoEquivalente1: String,
    anoEquivalente2: String,
    anoEquivalente3: String,
    anoEquivalente4: String,
    anoEquivalente5: String,
    anoEquivalente6: String,
    anoEquivalente7: String,
    anoEquivalente8: String,
    anoEquivalente9: String,
    anoEquivalente10: String,
    rendTribMes1: String,
    rendTribMes2: String,
    rendTribMes3: String,
    rendTribMes4: String,
    rendTribMes5: String,
    rendTribMes6: String,
    rendTribMes7: String,
    rendTribMes8: String,
    rendTribMes9: String,
    rendTribMes10: String,
    ex1: String,
    ex2: String,
    ex3: String,
    ex4: String,
    ex5: String,
    ex6: String,
    ex7: String,
    ex8: String,
    ex9: String,
    ex10: String,
    corrigidoAlvara1: String,
    corrigidoAlvara2: String,
    corrigidoAlvara3: String,
    corrigidoAlvara4: String,
    corrigidoAlvara5: String,
    corrigidoAlvara6: String,
    corrigidoAlvara7: String,
    corrigidoAlvara8: String,
    corrigidoAlvara9: String,
    corrigidoAlvara10: String,
    corrigidoDarf1: String,
    corrigidoDarf2: String,
    corrigidoDarf3: String,
    corrigidoDarf4: String,
    corrigidoDarf5: String,
    corrigidoDarf6: String,
    corrigidoDarf7: String,
    corrigidoDarf8: String,
    corrigidoDarf9: String,
    corrigidoDarf10: String,
    qtdMes1: String,
    qtdMes2: String,
    qtdMes3: String,
    qtdMes4: String,
    qtdMes5: String,
    qtdMes6: String,
    qtdMes7: String,
    qtdMes8: String,
    qtdMes9: String,
    qtdMes10: String,
    tribAlvara1: String,
    tribAlvara2: String,
    tribAlvara3: String,
    tribAlvara4: String,
    tribAlvara5: String,
    tribAlvara6: String,
    tribAlvara7: String,
    tribAlvara8: String,
    tribAlvara9: String,
    tribAlvara10: String,
    tribHonorarios1: String,
    tribHonorarios2: String,
    tribHonorarios3: String,
    tribHonorarios4: String,
    tribHonorarios5: String,
    tribHonorarios6: String,
    tribHonorarios7: String,
    tribHonorarios8: String,
    tribHonorarios9: String,
    tribHonorarios10: String,
    isentoAlvara1: String,
    isentoAlvara2: String,
    isentoAlvara3: String,
    isentoAlvara4: String,
    isentoAlvara5: String,
    isentoAlvara6: String,
    isentoAlvara7: String,
    isentoAlvara8: String,
    isentoAlvara9: String,
    isentoAlvara10: String,
  },
  valorCalculos: {
    somaDarf: Number,
    somaAlvara: Number,
    numeroDeMeses: String,
    brutoHomologado: String,
    tributavelHomologado: String,
    rendTribUm: Number,
    rendTribDois: Number,
    rendTribTres: Number,
    rendTribQuatro: Number,
    rendTribCinco: Number,
    rendTribSeis: Number,
    rendTribSete: Number,
    rendTribOito: Number,
    rendTribNove: Number,
    rendTribDez: Number,
    irrfUm: Number,
    irrfDois: Number,
    irrfTres: Number,
    irrfQuatro: Number,
    irrfCinco: Number,
    irrfSeis: Number,
    irrfSete: Number,
    irrfOito: Number,
    irrfNove: Number,
    irrfDez: Number,
    irpfUm: Number,
    irpfDois: Number,
    irpfTres: Number,
    irpfQuatro: Number,
    irpfCinco: Number,
    irpfSeis: Number,
    irpfSete: Number,
    irpfOito: Number,
    irpfNove: Number,
    irpfDez: Number,
    selicUm: Number,
    selicDois: Number,
    selicTres: Number,
    selicQuatro: Number,
    selicCinco: Number,
    finalUmCorrigido: Number,
    finalDoisCorrigido: Number,
    finalTresCorrigido: Number,
    finalQuatroCorrigido: Number,
    finalCincoCorrigido: Number,
  },
  paymentData: {
    assinatura: String,
  }
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

// Rota para deletar todos os usuários (use com cuidado)
app.delete('/users', async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).send({ message: 'All users deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting all users' });
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
