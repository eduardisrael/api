const express = require('express');
const mongoose = require('mongoose');

const app = express();
//conexion base de datos
const db = mongoose.connect('mongodb://localhost/libroAPI');

const libroRouter = express.Router();
const port = process.env.PORT || 3000;
const Libro = require('./models/libroModel');

libroRouter.route('/libros')
  .get((req, res) => {
    Libro.find((err, libros) => {
      if (err) {
        return res.send(err);
      }
      return res.json(libros);
    });
  });
app.use('/api',libroRouter);

app.get('/', (req, res) => {
  res.send('Bienvenido a mi Nodemon API');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
