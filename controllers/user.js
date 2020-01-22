const crypto = require('crypto'),
    shortId = require('shortid'),
    fs = require('fs'),
    models = require('../models/index'),
    jwt = require('jsonwebtoken'),
    config = require('../config');

    const sendmail = require('sendmail')();
    var generator = require('generate-password');

exports.createUser  = async (req,res)=>{
    let user = await models.User.findOne({ where: {email: req.body.email} });
    if (user === null) {
        try{
            let sampleFile = req.files.file;
            let nameFile = shortId.generate()
            sampleFile.mv(__dirname+'/../public/image/'+nameFile+'.jpg', (err)=> {
                    if (err)
                        return res.status(500).send(err);
                    })
                    req.body["avatar"] = nameFile+'.jpg';
        }catch(e){}
        try {
          
                    req.body["password"] = crypto.createHash('md5').update(req.body.password).digest("hex");
                    user = await models.User.create(req.body);
                        req.session.user_id = user.id;
                        res.status(201).send({
                            message: 'User added succesfully.',
                        });
                    } catch (error) {
                        res.status(400).send({
                            message: "Failed to add user."
                        });
                    }
    } else {
        return res.status(400).send({
            message: "This email address has already been registered."
        });
    }
}

exports.showUser  =async (req,res)=>{
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
        let user = await models.User.findOne({ attributes: ["id","name",
            "email",
            "avatar",
            "phone",
            "age",
            "city"], raw: true, where: { id: data.id} });
      
        return  res.status(201).json( filledProps(user));
}
exports.showUserId  =async (req,res)=>{
        let user = await models.User.findOne({ attributes: ["id","name",
            "email",
            "avatar",
            "phone",
            "age",
            "city"], raw: true, where: { id: req.query.id } });
        return  res.status(201).json( filledProps(user));
}
exports.showAllUser  =async (req,res)=>{
    let user = await models.User.findAll({ attributes: ["id","name",
    "email",
    "avatar",
    "phone",
    "age",
    "city"], raw: true});
    return  res.status(201).json(user.map(x=> filledProps(x)));
}

exports.updateUser  = async (req,res)=>{
    // console.log(req.files.file)
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
        try{
          let avatar = await models.User.findOne({attributes: ["avatar"], raw: true, where: { id: data.id  } });
        //   console.log(avatar)
          if(avatar.avatar!==null){
            try{
            fs.unlinkSync(__dirname+'/../public/image/'+avatar.avatar);
            } catch(e) {}
            let sampleFile = req.files.file;
            let nameFile = shortId.generate()
            sampleFile.mv(__dirname+'/../public/image/'+nameFile+'.jpg', (err)=> {
                    if (err)
                        return res.status(500).send(err);
                    })
                    req.body["avatar"] = nameFile+'.jpg';
                }
                else{
                    let sampleFile = req.files.file;
            let nameFile = shortId.generate()
            sampleFile.mv(__dirname+'/../public/image/'+nameFile+'.jpg', (err)=> {
                    if (err)
                        return res.status(500).send(err);
                    })
                    req.body["avatar"] = nameFile+'.jpg';
                }
        }catch(e){
            console.log(e)
        }
        // try{
        //     req.body["password"] = crypto.createHash('md5').update(req.body.password).digest("hex");
        // }catch(e){console.log(e)}
        console.log(req.body)
        try{
        let user = await models.User.update(req.body,{where: { id: data.id } });
        res.status(201).send({
            message: 'User update succesfully.',
        });
        }catch(e){
            res.status(400).send({
                message: "Failed to update user."
            });
        }
}


exports.login  = async (req,res)=>{
    let user = await models.User.findOne({attributes: ["id","name",
    "email",
    "avatar",
    "phone",
    "age",
    "city","password"], raw: true, where: { email: req.body.email } });

    if (user === null) {
        return res.status(400).send({
            message: "User with this email does not exist."
        });
    } else {
        if (crypto.createHash('md5').update(req.body.password).digest("hex") === user.password) {
            req.session.user_id = user.id;
            user.password = null;
            let token = jwt.sign({id:user.id},
                config.secret,
                { expiresIn: '365d' // expires in 24 hours
                }
              );
            user['token'] = token;
            return res.status(200).json(filledProps(user))
        } else {
            return res.status(400).send({
                message: "Wrong password."
            });
        }
    }
}

exports.logout  = (req,res)=>{
    req.session.destroy((err) => {
        if (err) {
            res.status(404)
        }
        res.status(200).send({
            message: 'Logout succesfully.'
        })
    });
}
exports.feedback = (req,res)=>{
    sendmail({
        from:  req.body.email,
        to: "support@uniexpertservice.com",
        // to: "maximkerimov88@gmail.com",
        subject: 'Обрантная связь',
        html: req.body.message,
    }, function (err, reply) {
       console.log(err)
       console.log(reply)
    });
}



exports.repassword = async (req,res)=>{
    let password = generator.generate({
        length: 12,
        numbers: true
    });
    let user = await models.User.findOne({ where: {email: req.body.email} });
    if (user !== null) {
        sendmail({
            from: "support@uniexpertservice.com",
            to: req.body.email,
            // to: "maximkerimov88@gmail.com",
            subject: 'Востановление пароля',
            html: password,
        }, function (err, reply) {
           console.log(err)
           console.log(reply)
        });
        user = await models.User.update({password: crypto.createHash('md5').update(password).digest("hex")},{ where: {email: req.body.email} });
        return res.status(201).send({
            message: "succesfully"
        })
    } else {
        return res.status(400).send({
            message: "This email address has not registered."
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