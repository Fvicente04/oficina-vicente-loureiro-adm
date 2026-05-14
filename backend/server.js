require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models');
const errorHandler = require('./src/middleware/errorHandler');
const auth = require('./src/middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:4200' }));
app.use(express.json());

// Public routes
app.use('/api/auth', require('./src/routes/auth'));

// Protected routes
app.use('/api/clientes',   auth, require('./src/routes/clientes'));
app.use('/api/veiculos',   auth, require('./src/routes/veiculos'));
app.use('/api/os',         auth, require('./src/routes/os'));
app.use('/api/estoque',    auth, require('./src/routes/estoque'));
app.use('/api/financeiro', auth, require('./src/routes/financeiro'));
app.use('/api/dashboard',  auth, require('./src/routes/dashboard'));

app.use(errorHandler);

sequelize.authenticate()
  .then(() => {
    console.log('✓ PostgreSQL conectado');
    return app.listen(PORT, () =>
      console.log(`✓ Servidor rodando em http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error('✗ Erro ao conectar no banco:', err.message);
    process.exit(1);
  });
