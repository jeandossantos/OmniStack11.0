const db = require('../database/db');

const save = (req, resp) => {
    const incident = { ...req.body };
    incident.ong_id = req.headers.authorization;

    db('incidents').insert(incident)
    .then(() => resp.status(201).send())
    .catch(e => resp.status(500).json(e))
}

const getAll = async (req, resp) => {

    const page = req.query.page || 1;
    const count = await  db('incidents').count().first();

    resp.header('X-Total-Count', count['count(*)']);

    db('incidents')
    .join('ongs', 'ongs.id', "=", 'incidents.ong_id')
    .limit(5)
    .offset((page - 5) * 5)
    .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
    ])
    .then(incidents => resp.status(200).json(incidents))
    .catch(e => resp.status(500).json(e))
}

const remove = async (req, resp) => {
    if(!req.headers.authorization) return resp.status(401).send('Não Autorizado.');

    const ongFromDB = await db('ongs').select('id').where({ id: req.headers.authorization });
    
    console.log(ongFromDB);

    if(Array.isArray(ongFromDB) && ongFromDB.length === 0) return resp.status(401).send('Não Autorizado2.');

    db('incidents').del().where({ id: req.params.id })
    .then(_ => resp.status(201).send())
    .catch(e => resp.status(500).send('Erro Interno.'))
}

const getByOng = (req, resp) => {
    db('incidents').select().where({ ong_id: req.headers.authorization }).first()
    .then(incident => resp.status(201).json(incident))
    .catch(e => resp.status(500).send('Erro Interno'))
}

module.exports = {save, getAll, remove , getByOng }