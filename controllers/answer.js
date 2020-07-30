const crypto = require('crypto'),
    models = require('../models/index');



exports.createAnswer = async (req,res)=>{
   
    try {
        let answer = await models.Answer.create({
            id_review: req.body.id,
            id_user: req.body.id_user,
            name: req.body.name,
            message: req.body.message
        })
        res.status(201).send({
            message: 'Answer add succesfully.',
        });
        } catch(e){
            res.status(400).send({
                message: "Failed to add answer."
            });
        }
}

exports.showAnswer = async (req,res)=>{
    let answer = await models.Answer.findAll({attributes: ["id","id_user",
    "name","message"],raw: true,
        where:{id_review:req.query.id}
    })
    // console.log(answer)
    let result = answer.map( async x=>{
        try{
            let user = await models.User.findOne({attributes: ["name",
    "avatar"], raw: true, where: { id: x.id_user } });
            return {
                id: x.id,
                name:user.name,
                avatar: user.avatar,
                id_user: x.id_user,
                message:x.message,
            }
        }catch(e){
            console.log(e)
        }
    })
    return res.status(201).json(await Promise.all(result).then(x=> x));
    // return res.status(201).json(answer);
}
// exports.updateAnswer = (req,res)=>{
    
// }

// exports.destroyAnswer = (req,res)=>{
//     if (req.session.user_id) {
//         try {
//         let Answer = await models.Answer.destroy({where:{id:req.body.id}});
//         res.status(201).send({
//             message: 'Answer delete succesfully.',
//         });
//         } catch(e){
//             res.status(400).send({
//                 message: "Failed to delete answer."
//             });
//         }
      
        
//     } else {
//         res.status(404).send({
//             message: 'Log in or Create an Account.'
//         })
//     }
// }

