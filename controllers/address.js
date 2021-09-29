const db = require('../models/index.js');

const address = db.address;
const community = db.community;

exports.createAddress = async(req, res) => {
    try {
        const { body } = req;

        if(!body.country)
            return res.send(400).send({ message:'Country is required' });
        if(!body.state)
            return res.send(400).send({ message:'state is required' });
        if(!body.city)
            return res.send(400).send({ message:'City is required' });

        const create = await address.create({
            country: body.country,
            state: body.state,
            city: body.city,
        });

        return res.status(200).send({ message:'Direccion creada correctamente' });

    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.getAddress = async(req, res) => {
    try {
        const find = await address.findAll({
            where: { statusDelete: false },
            include:{
                model:community,
            },
        });
        return res.status(200).send(find)
    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.updateAddress = async(req, res) => {
    try {
        const { body, params } = req;

        if(!body)
            return res.status(400).send({ message:'los datos son requeridos' });
        
        const find = await address.findOne({
            where: { id: params.id, statusDelete: false },
        });

        if(!find)return res.status(404).send({ message:'Address no existe' });

        find.country = body.country;
        find.state =  body.state;
        find.city = body.city;
        find.save();
        return res
            .status(200)
            .send({ message:'Address actualizada correctamente' });

    } catch (error) {
        return res.status(500).send(message.error);
    };
};

exports.deleteAddress =  async (req, res) => {
    try {
        const { id } = req.params;
        const validate =  await address.findByPk(id);
        if (!validate) return res.status(404).send({ message:'Address no existe' });
        if (validate.statusDelete === true) return res.status(404).send({ message:'Address no existe' });

        validate.statusDelete =  true;
        validate.save()

        return res.status(200).send({ message:'Address eliminado correctamente' });

    } catch (error) {
        return res.status(500).send(message.error);
    }
};