const crypto = require('crypto'),
    models = require('../models/index'),
    shortId = require('shortid');
    let jwt = require('jsonwebtoken');

function replaceUndefinedOrNull(key, value) {
        if (value === null || value === undefined || value === '') {
          return undefined;
        }
        
        return value;
}
exports.createPlace  = async (req,res)=>{

    
        let image = [];
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
        try{
            req.files.file.map(x=>{
                let name = shortId.generate();
                x.mv(__dirname+'/../public/image/'+name+'.jpg', (err)=> {
                    if (err)
                        return res.status(500).send(err);
                })
                image.push(name+'.jpg')
            })
            req.body["image"] = image.join(";")
        }catch(e){
            try{
                    let name = shortId.generate();
                    req.files.file.mv(__dirname+'/../public/image/'+name+'.jpg', (err)=> {
                        if (err)
                            return res.status(500).send(err);
                    })
                    image.push(name+'.jpg')
                    req.body["image"] = image.join(";")
            }catch(e){
                console.log(e)
            }
        }
        try{req.body["time"] = req.body.time.join(";")}catch(e){}
        try{req.body["phone"] = req.body.phone.join(";")}catch(e){console.log(e)}
        try{req.body["email"] = req.body.email.join(";")}catch(e){console.log(e)}

        try {
            let data = jwt.decode(token)

            req.body['id_user'] = data.id;
        let Place = await models.Place.create(JSON.parse(JSON.stringify(req.body,replaceUndefinedOrNull)));
        res.status(201).send({
            message: 'Place added succesfully.',
        });
        } catch(e){
            console.log(e)
            res.status(400).send({
                message: "Failed to add place."
            });
        }
      
        
   
}
exports.showPlaceUser  = async (req,res)=>{
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
    'facebook',
    'break',
    'instagram',
    'telegram',
    'twitter',
    "url",
    "address",
    "about",
    "time"], raw: true, where: { id_user: data.id } });
    Place.map(x=>{
        try{x["time"] = x.time.split(";");}catch(e){}
        try{x["time"] = x.time.split(";");}catch(e){}
        try{x["email"] = x.email.split(";");}catch(e){}
        try{x["phone"] = x.phone.split(";");}catch(e){}
    })
    return  res.status(201).json(Place);
}
exports.showPlaceId  = async (req,res)=>{
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
    'facebook',
    'break',
    'instagram',
    'telegram',
    'twitter',
    "email",
    "url",
    "address",
    "about",
    "time"], raw: true, where: { id: req.query.id } });
    try{Place["time"] = Place.time.split(";");}catch(e){}
    try{Place["image"] = Place.image.split(";");}catch(e){}
    try{x["email"] = x.email.split(";");}catch(e){}
    try{x["phone"] = x.phone.split(";");}catch(e){}
    models.History.create({id_place: req.query.id,id_user:data.id});
    return  res.status(201).json(filledProps(Place));
}
exports.showPlace  = async (req,res)=>{
    let Place = await models.Place.findAll({ attributes: ["id",
    "image",
    "title",
    "phone",
    "types",
    "city",
    "area",
    "typeId",
    'facebook',
    'break',
    'instagram',
    'telegram',
    'twitter',
    "cityId",
    "areaId",
    "email",
    "url",
    "address",
    "about",
    "time"], raw: true, where:{id:JSON.parse(req.query.id)}});
    Place.map(x=>{
        try{x["time"] = x.time.split(";");}catch(e){}
        try{x["image"] = x.image.split(";");}catch(e){}
        try{x["email"] = x.email.split(";");}catch(e){}
        try{x["phone"] = x.phone.split(";");}catch(e){}
    })
    return  res.status(201).json(Place);
}
exports.showAllPlace  = async (req,res)=>{
    let Place = await models.Place.findAll({ attributes: ["id",
    "image",
    "title",
    "phone",
    "types",
    "city",
    "area",
    "typeId",
    "cityId",
    'facebook',
    'break',
    'instagram',
    'telegram',
    'twitter',
    "areaId",
    "email",
    "url",
    "address",
    "about",
    "time"], raw: true, where:req.query});
    Place.map(x=>{
        try{x["time"] = x.time.split(";");}catch(e){}
        try{x["image"] = x.image.split(";");}catch(e){}
        try{x["email"] = x.email.split(";");}catch(e){}
        try{x["phone"] = x.phone.split(";");}catch(e){}
    })
    return  res.status(201).json(Place);
}
exports.updatePlace = async (req,res)=>{
    let image = [];
        try{
            req.files.file.map(x=>{
                let name = shortId.generate();
                x.mv(__dirname+'/../public/image/'+name+'.jpg', (err)=> {
                    if (err)
                    console.log(err)
                })
                image.push(name+'.jpg')
            })
            req.body["image"] = image.join(";")
        }catch(e){
            try{
                    let name = shortId.generate();
                    req.files.file.mv(__dirname+'/../public/image/'+name+'.jpg', (err)=> {
                        if (err)
                            console.log(err)
                    })
                    image.push(name+'.jpg')
                    req.body["image"] = image.join(";")
            }catch(e){
                console.log(e)
            }
        }
        try{req.body["time"] = req.body.time.join(";")}catch(e){}
        try{req.body["phone"] = req.body.phone.join(";")}catch(e){}
        try{req.body["email"] = req.body.email.join(";")}catch(e){}
        try {
        let Place = await models.Place.update(req.body,{where:{id:req.body.id}});
        res.status(201).send({
            message: 'Place update succesfully.',
        });
        } catch(e){
            res.status(400).send({
                message: "Failed to update place."
            });
        }
}

exports.destroyPlace = async (req,res)=>{
        try {
        let Place = await models.Place.destroy({where:{id:req.body.id}});
        res.status(201).send({
            message: 'Place delete succesfully.',
        });
        } catch(e){
            res.status(400).send({
                message: "Failed to delete place."
            });
        }
}
exports.deleteImagePlace = async (req, res) => {
    let image = await models.Place.findOne({attributes: ["image"], raw: true, where: { id: req.body.id  } });
    fs.unlinkSync(__dirname+'/../public/image/'+req.body.name);
    let arr = image["image"].split(";")
    arr.remove(req.body.name)

    
        try {
            let Institution = await models.Place.update({image:arr.join(";")}, {where: { id: req.body.id }});
               
                res.status(201).send({
                    message: 'Image delete succesfully.',
                });
            } catch (error) {
                res.status(400).send({
                    message: "Failed to delete image."
                });
            }

}

var filledProps = el => {
   
    return Object.keys(el).reduce((newObj, key) => {
      const value = el[key];
      if (value !== null) {
        newObj[key] = value;
      }
      return newObj;
    }, {});
  };

