const crypto = require('crypto'),
    models = require('../models/index'),
    shortId = require('shortid');


exports.createInstitution  = async (req,res)=>{
    if (req.session.user_id) {
        try{
            let image = [];
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
                    image.push(name)
                    req.body["image"] = image.join(";")
            }catch(e){
    
            }
        }
        try{req.body["time"] = req.body.time.join(";")}catch(e){}
        try{ req.body["price"] = req.body.price.join(";")}catch(e){}
        try{req.body["stock"] = req.body.stock.join(";")}catch(e){}
        req.body["id_user"] = req.session.user_id
        try {
        let Institution = await models.Institution.create(req.body);
        res.status(201).send({
            message: 'Institution added succesfully.',
        });
        } catch(e){
            res.status(400).send({
                message: "Failed to add institution."
            });
        }
      
        
    } else {
        res.status(404).send({
            message: 'Log in or Create an Account.'
        })
    }
}

exports.showInstitution  = async (req,res)=>{
    if (req.session.user_id) {
        let Institution = await models.Institution.findAll({ attributes: ["id",
        "image",
        "title",
        "phone",
        "email",
        "address",
        "about",
        "time",
        "price",
        "stock"], raw: true, where: { id_user: req.session.user_id } });
        let temp = Institution.map( async x=>{
            try{x["image"] = x.image.split(";");}catch(e){}
            try{x["time"] = x.time.split(";");}catch(e){}
            try{ x["price"] = x.price.split(";");}catch(e){}
            try{ x["stock"] = x.stock.split(";");}catch(e){}
            let Place = await models.Place.findAll({ attributes: ["id",
            "image",
            "title",
            "phone",
            "email",
            "address",
            "about",
            "time"], raw: true, where: { id_institution: x.id } });
            Place.map(y=>{
            try{y["time"] = y.time.split(";");}catch(e){}
            try{y["image"] = y.image.split(";");}catch(e){}
            })
            x["Place"] = Place
            return x
        })
     
        return  res.status(201).json(await Promise.all(temp).then(x=> x));
    } else {
        res.status(404).send({
            message: 'Log in or Create an Account.'
        })
    }
}

exports.showAllInstitution  = async (req,res)=>{
    let Institution = await models.Institution.findAll({ attributes: ["id",
        "image",
        "title",
        "phone",
        "email",
        "address",
        "about",
        "time",
        "price",
        "stock"], raw: true});
        let temp = Institution.map( async x=>{
            try{x["image"] = x.image.split(";");}catch(e){}
            try{x["time"] = x.time.split(";");}catch(e){}
            try{ x["price"] = x.price.split(";");}catch(e){}
            try{ x["stock"] = x.stock.split(";");}catch(e){}
            let Place = await models.Place.findAll({ attributes: ["id",
            "image",
            "title",
            "phone",
            "email",
            "address",
            "about",
            "time"], raw: true, where: { id_institution: x.id } });
         
            Place.map(y=>{
                try{y["time"] = y.time.split(";");}catch(e){}
                try{y["image"] = y.image.split(";");}catch(e){}
                })
                x["Place"] = Place
                return x
         
        })
        return  res.status(201).json(await Promise.all(temp).then(x=> x));
}
exports.showInstitutionId  = async (req,res)=>{
  
    let Institution = await models.Institution.findOne({ attributes: ["id",
    "image",
    "title",
    "phone",
    "email",
    "address",
    "about",
    "time",
    "price",
    "stock"], raw: true,where:{id:req.query.id}});
   
    try{Institution["image"] = Institution.image.split(";");  }catch(e){}
    try{Institution["time"] = Institution.time.split(";"); }catch(e){}
    try{Institution["price"] = Institution.price.split(";"); }catch(e){}
    try{Institution["stock"] = Institution.stock.split(";"); }catch(e){}
  
        let Place = await models.Place.findAll({ attributes: ["id",
        "image",
        "title",
        "phone",
        "email",
        "address",
        "about",
        "time"], raw: true, where: { id_institution: Institution.id } });
        Place.map(y=>{
            try{y["time"] = y.time.split(";");}catch(e){}
            try{y["image"] = y.image.split(";");}catch(e){}
            })
        Institution["Place"] = Place;

     
    return  res.status(201).json(filledProps(Institution));
}
exports.updateInstitution = async (req,res)=>{
    if (req.session.user_id) {
        try{
            let image = await models.Institution.findOne({attributes: ["image"], raw: true, where: { id: req.body.id  } });
            image = image.split(";");
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
                    image.push(name)
                    req.body["image"] = image.join(";")
            }catch(e){
    
            }
        }
        try{req.body["time"] = req.body.time.join(";")}catch(e){}
        try{ req.body["price"] = req.body.price.join(";")}catch(e){}
        try{req.body["stock"] = req.body.stock.join(";")}catch(e){}
        req.body["id_user"] = req.session.user_id
        try {
        let Institution = await models.Institution.update(req.body,{where:{id:req.body.id}});
        res.status(201).send({
            message: 'Institution update succesfully.',
        });
        } catch(e){
            res.status(400).send({
                message: "Failed to update institution."
            });
        }
      
        
    } else {
        res.status(404).send({
            message: 'Log in or Create an Account.'
        })
    }
}

exports.destroyInstitution = async (req,res)=>{
    if (req.session.user_id) {
        try {
        let Institution = await models.Institution.destroy({where:{id:req.body.id}});
        res.status(201).send({
            message: 'Institution delete succesfully.',
        });
        } catch(e){
            res.status(400).send({
                message: "Failed to delete institution."
            });
        }
      
        
    } else {
        res.status(404).send({
            message: 'Log in or Create an Account.'
        })
    }
}
exports.deleteImageInstitution = async (req, res) => {
    let image = await models.Institution.findOne({attributes: ["image"], raw: true, where: { id: req.body.id  } });
    fs.unlinkSync(__dirname+'/../public/image/'+req.body.name);
    let arr = image["image"].split(";")
    arr.remove(req.body.name)

    
        try {
            let Institution = await models.Institution.update({image:arr.join(";")}, {where: { id: req.body.id }});
               
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