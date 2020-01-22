const crypto = require('crypto'),
    models = require('../models/index');

exports.showHistory = async(req,res)=>{
     let history = await models.History.findAll(
        { attributes: ["id","id_place","id_user"
       ], raw: true, where: { id_user: req.session.user_id } }
     );
     let temp = history.map( async x=>{
        let Place = await models.Place.findOne({ attributes: ["id",
        "image",
        "title",
        "types",
        "city",
        "area",
        "typeId",
    "cityId",
    "areaId",
        "phone",
        "email",
        "url",
        "address",
        "about",
        "time"], raw: true, where: { id: x.id_place } });
        
        try{Place["time"] = Place.time.split(";");}catch(e){}
        try{Place["image"] = Place.image.split(";");}catch(e){}
        
        return Place
    })

    return  res.status(201).json(await Promise.all(temp).then(x=> x));
}