/* eslint-disable no-param-reassign */
const express = require('express');

function routes(Libro){
  const libroRouter = express.Router();

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
    })
    .put((req,res) => {
      Libro.findById(req.params.idLibro, (err,libro) =>{
        if(err){
          return res.send(err);
        }
        libro.titulo = req.body.titulo;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.visto = req.body.visto;
        libro.save();
        return res.json(libro);
      });
    });

  return libroRouter; //salga de la funcion
}

module.exports = routes;