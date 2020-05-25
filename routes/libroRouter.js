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
  libroRouter.use('/libros/:idLibro', (req, res, next) => { //Middleware
    Libro.findById(req.params.idLibro, (err,libro) =>{
      if (err) {
        return res.send(err);
      }
      if (libro){
        req.libro = libro;
        return next();
      }
      return res.sendStatus(404); //si no existe
    });
  });
  libroRouter.route('/libros/:idLibro') //5eb53471277a92fb671c72ad
    .get((req,res) => res.json(req.libro))
    .put((req,res) => {
        const { libro } = req;
        libro.titulo = req.body.titulo;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.visto = req.body.visto;
        req.libro.save((err) => {
          if(err){
            return res.send(err);
          }
          return res.json(libro);
        });
    })
    .patch((req,res) => {
      const { libro } = req;
      // eslint-disable-next-line no-underscore-dangle
      if(req.body._id){
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        libro[key] = value;
      });
      req.libro.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(libro);
      });
    })
    .delete((req,res) => {
      req.libro.remove((err) => {
        if(err){
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return libroRouter; //salga de la funcion
}

module.exports = routes;