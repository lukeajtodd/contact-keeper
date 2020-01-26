const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

if (process.env.NODE_ENV === 'production') {
  const staticPath = path.resolve(__dirname, 'client', 'build');
  app.use(express.static(staticPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(staticPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
