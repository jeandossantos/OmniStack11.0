const db = require('../database/db');

const save = (req, resp) => {
    const incident = { ...req.body };
    incident.ong_id = req.headers.authorization;
    console.log(incident)

    db('incidents').insert(incident)
    .then(() => resp.status(201).send())
    .catch(_ => resp.status(500).send('Erro inesperado'))
}

const getAll = async (req, resp) => {

    const page = req.query.page || 1;
    const count = await  db('incidents').count().first();
    const limit = 5;

    resp.header('X-Total-Count', count['count(*)']);

    db('incidents')
    .join('ongs', 'ongs.id', "=", 'incidents.ong_id')
    .limit(limit)
    .offset(page * limit - limit)
    .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
    ])
    .orderBy('id', 'desc')
    .then(incidents => resp.status(200).json(incidents))
    .catch(e => resp.status(500).json(e))
}

const remove = async (req, resp) => {
    if(!req.headers.authorization) return resp.status(401).send('Não Autorizado.');

    const ongFromDB = await db('ongs').select('id').where({ id: req.headers.authorization }).first();
    
    console.log(ongFromDB);

    if(!ongFromDB) return resp.status(401).send('Não Autorizado.');

    db('incidents').del().where({ id: req.params.id })
    .then(_ => resp.status(201).send())
    .catch(e => resp.status(500).send('Erro Interno.'))
}

const getByOng = (req, resp) => {

    const id = req.headers.authorization;

    db('incidents')
        .select()
        .where({ ong_id: id }).orderBy('id', 'desc')
        .then(incidents => resp.json(incidents))
        .catch(_ => resp.status(500).send())
}

module.exports = {save, getAll, remove , getByOng }