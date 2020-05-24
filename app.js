const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
//conexion base de datos
const db = mongoose.connect('mongodb://localhost/libroAPI');

const port = process.env.PORT || 3000;
const Libro = require('./models/libroModel'); //obtengo el modelo 
const libroRouter = require('./routes/libroRouter')(Libro);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api',libroRouter);

app.get('/', (req, res) => {
  res.send('Bienvenido a mi Nodemon API');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
