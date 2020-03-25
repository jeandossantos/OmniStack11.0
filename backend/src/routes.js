const express = require('express');

const OngsController = require('./controllers/OngsController');
const IncidentsController = require('./controllers/IncidentsController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/login', SessionController.login);

routes.get('/ongs', OngsController.getAll);
routes.post('/ongs', OngsController.save);

routes.get('/profile', IncidentsController.getByOng);

routes.post('/incidents', IncidentsController.save);
routes.get('/incidents', IncidentsController.getAll);
routes.delete('/incidents/:id', IncidentsController.remove);

module.exports = routes;