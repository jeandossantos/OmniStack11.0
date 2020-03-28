const db = require('../database/db');
const crypto = require('crypto');

const save = (req, resp) => {
    const ongs = { ...req.body };
    ongs.id = crypto.randomBytes(4).toString('HEX');

    db('ongs').insert(ongs)
    .then(() => resp.status(201).send(ongs.id))
    .catch(_ => resp.status(500).send("Erro inesperado"));
}

const getAll = (req, resp) => {
    db('ongs').select()
    .then(ongs => resp.status(200).json(ongs))
    .catch(_ => resp.status(500).send("Erro inesperado"))
}

module.exports = { save, getAll };