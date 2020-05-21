const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
//conexion base de datos
const db = mongoose.connect('mongodb://localhost/libroAPI');

const libroRouter = express.Router();
const port = process.env.PORT || 3000;
const Libro = require('./models/libroModel'); //obtenfo el modelo 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

libroRouter.route('/libros')
  .post((req,res) => {
    const libro = new Libro(req.body);

    libro.save();
    return res.status(201).json(libro); //Devuelva 
  })

  .get((req, res) => {
    const query = {} //objeto vacio
    if (req.query.genero){
      query.genero = req.query.genero;
    }

    Libro.find(query, (err, libros) => {
      if (err) {
        return res.send(err);
      }
      return res.json(libros);
    });
  });

  libroRouter.route('/libros/:idLibro') //5eb53471277a92fb671c72ad
  .get((req,res) => {
    Libro.findById(req.params.idLibro, (err,libro) =>{
      if(err){
        return res.send(err);
      }
      return res.json(libro);
    });
  });

app.use('/api',libroRouter);

app.get('/', (req, res) => {
  res.send('Bienvenido a mi Nodemon API');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
