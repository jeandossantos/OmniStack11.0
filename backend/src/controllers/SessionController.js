const db = require('../database/db');

const login = async (req, resp) => {
    try {
        if(!req.body.id) throw 'Necessário Informar ID';
    
        const ongFromDB = await db('ongs').select('name').where({ id: req.body.id }).first();
        
        if(!ongFromDB) throw 'ONG não Encontrada.';
    
         resp.status(201).send(ongFromDB);
        
    } catch (error) {
         resp.status(400).send(error); 
    }

}

module.exports = { login };