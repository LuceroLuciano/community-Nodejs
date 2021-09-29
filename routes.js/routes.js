const express = require('express');

const enrutador = express.Router();

const communities = require('../controllers/communities.js');
const address = require('../controllers/address.js');
const generalities = require('../controllers/generalities.js')

const {verifyToken, verifyRole} = require('../middleware/authorization.js');

//rutas para comunidades
enrutador
    .route('/communities')
    .get(verifyToken,communities.getCommunities) //metodo de lectura
    .post(verifyToken, communities.createCommunity);
    //.post(verifyRole, verifyToken, communities.createCommunity);

enrutador
    .route('/communities/:id')
    .put(communities.updateCommunities)
    .delete(communities.deleteCommunity);  


//rutas para address
enrutador
    .route('/address')
    .get(verifyToken, address.getAddress) //metodo de lectura
    .post(address.createAddress);

enrutador
    .route('/address/:id')
    .put(address.updateAddress)
    .delete(address.deleteAddress);  


//rutas para  generalidades 
enrutador.route('/login').post(generalities.login);

module.exports = enrutador; 


