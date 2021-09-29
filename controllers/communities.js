
const db = require('../models/index.js')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const bcrypt = require('bcryptjs');

const uploadImages = require("../utils/uploadImages");
const community = db.community;
const address = db.address;

exports.createCommunity = async(req, res)=>{
    try {
        const { body } = req;

        console.log('Estamos entrando');

        if(!body.name)return res.status(404).send({message:'name is required'});
        if(!body.type)return res.status(404).send({message:'type is required'});

        if(!body.addressId)
            return res.status(404).send({ message:"addressId is required" });

        const findAddress = await address.findOne({
            where: {id:body.addressId, statusDelete: false}
        });

        let logo = await uploadImages.fileUpload(body.logo,"/logos");

        let encriptedPasssword = bcrypt.hashSync(body.password,10);
        
        //console.log('El hash a guardar \n', encriptedPasssword);

        if(!findAddress)
            return res.status(404).send({ message:'Address no encontrada' });

        //insertando datos a la BD
        const create = await community.create({
            email: body.email,
            password: encriptedPasssword,
            name: body.name,
            type: body.type,
            addressId: body.addressId,
            logo: logo,
        });
        
        return res.status(201).send({ message: "comunidad creada correctamente" });

    } catch (error) {
        return res.status(500).send(message.error)
    }
};

exports.getCommunities = async (req, res) =>{
    try {
        //query
        // include, nos trae dos tablas
        const { stateName } = req.query;

        if(stateName){
            const find = await community.findAll({
                where: { statusDelete: false },
                include:{
                    model: address,
                    where:{state:{[Op.iRegexp]:stateName }},
                },
            });

            return res.status(200).send(find);
        }

        const find = await community.findAll({
            where:{ statusDelete:false },
        });

        return res.status(200).send(find);
    } catch (error) {
        console.error(error);
        return res.status(500).send(message.error);
    }
};

exports.updateCommunities = async (req, res)=>{
    try {
        const { body, params } = req;

        if (!body)
            return res.status(400).send({ message: 'los datos son requeridos para actualizar' });
        if (!body.name)
            return res.status(404).send({ message: 'name is required' });
        if (!body.type)
            return res.status(404).send({ message: 'type is requires' })

        const validate = await community.findOne({
            where: { id: params.id },
        });

        if(!validate) 
            return res.status(404).send({ message:'No se encontro comunidad, lo sentimos' });
        if(validate.statusDelete === true)
            return res.status(404).send({ message:'No se encontro comunidad' });
        
        validate.name = body.name;
        validate.type = body.type;
        validate.save();
        
        return res.status(200).send({ message:'Cominidad se actualizo correctamente' });
        
    } catch (error) {
        return res.status(500).send(message.error);
    };
};

exports.deleteCommunity = async(req, res)=>{
    try {
        const { id }=req.params;

        const find = await community.findByPk(id);

        if (!find)
            return res.status(404).send({ message: 'No se encontro comunidad' });
        if (find.statusDelete === true)
            return res.status(404).send({ message: 'No se encontro comunidad' });

        find.statusDelete = true;
        find.save();
            
        return res
            .status(200)
            .send({ message: 'Comunidad eliminada correctamente' });

    } catch (error) {
        return res.status(500).send(message.error);
    }
};









/*---------------------------------------*/

//let communities = [];

//controlador es un enpoit, se hace un enpoint por cada controlador
//controlador
//async funcion asincrona
/*exports.createCommunities = async(req, res)=>{
    try {
        const { body } = req;

        console.log("\n This is the body", body);

        //array
        const data = {
            id: body.id,
            name: body.name,
            type: body.type,
            userLimit:body.userLimit,
        };
        communities.push(...communities, data);
        //communities.push(...data);

        return res.status(201).send({ message: "comunidad creada correctamente" });

    } catch (error) {
        return res.status(500).send(message.error)
    }
    //console.log();
    //setTimeout(()=>{},500)
    //console.log('algo');

}; */

/*exports.getCommunities = async (req, res) =>{
    try {
        return res.status(200).send({ communities });
    } catch (error) {
        return res.status(500).send(message.error);
    }
};*/

/*exports.updateCommunities = async (req, res)=>{
    try {
        const {body, params}=req;
        const update = communities.find(id);
        const data = {
            name:body
        }
    } catch (error) {
        
    }
}*/