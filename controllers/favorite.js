const crypto = require('crypto'),
    models = require('../models/index');



exports.createFavorite  = async (req,res)=>{
    let data = {id: null};
    try
    {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
     data = jwt.decode(token)
    } catch (e) {}
    let favorite = await models.Favorite.findOne({ where: {id_place: req.body.id} });
    if (favorite === null) {
        try {
            await models.Favorite.create({
                id_place: req.body.id,
                id_user: data.id,
            })
            res.status(201).send({
                message: 'Favorite add succesfully.',
            });
            } catch(e){
                res.status(400).send({
                    message: "Failed to add favorite."
                });
            }
       
    } else {
        return res.status(400).send({
            message: "This place has already."
        });
    }
}

exports.showFavorite  = async (req,res)=>{
    
        let Favorite = await models.Favorite.findAll({ attributes: ["id",
        "id_place"], raw: true, where: { id_user: req.session.user_id } });
        let temp = Favorite.map( async x=>{
            let Place = await models.Place.findAll({ attributes: ["id",
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
            Place.map(y=>{
            try{y["time"] = y.time.split(";");}catch(e){}
            try{y["image"] = y.image.split(";");}catch(e){}
            })
            x["Place"] = Place
            return x
        })
     
        return  res.status(201).json(await Promise.all(temp).then(x=> x));
  
}

exports.destroyFavorite = async (req,res)=>{
    
        try {
        let Favorite = await models.Favorite.destroy({where:{id:req.body.id}});
        res.status(201).send({
            message: 'Favorite delete succesfully.',
        });
        } catch(e){
            res.status(400).send({
                message: "Failed to delete favorite."
            });
        }
}

