const crypto = require('crypto'),
    models = require('../models/index');



exports.createReview  = async (req,res)=>{
    try {
        let review = await models.Review.create({
            id_place: req.body.id,
            name: req.body.name,
            message: req.body.message
        })
        res.status(201).send({
            message: 'Review add succesfully.',
        });
        } catch(e){
            res.status(400).send({
                message: "Failed to add review."
            });
        }
}

exports.showReview  = async (req,res)=>{
    let review = await models.Review.findAll({attributes: ["id",
    "name","message"],raw: true,
        where:{id_place:req.query.id}
    })
    let result = review.map( async x=>{
        try{
            let answer = await models.Answer.findAll({attributes: ["id",
            "name","message"],raw: true,
                where:{id_review:x.id}
            })
            
            return {
                id: x.id,
                name:x.name,
                message:x.message,
                answer: answer 
            }
        }catch(e){}
    })
    return res.status(201).json(await Promise.all(result).then(x=> x));
}


// exports.updateReview = (req,res)=>{
    
// }

// exports.destroyReview = (req,res)=>{
//     if (req.session.user_id) {
//         try {
//         let Review = await models.Review.destroy({where:{id:req.body.id}});
//         res.status(201).send({
//             message: 'Review delete succesfully.',
//         });
//         } catch(e){
//             res.status(400).send({
//                 message: "Failed to delete review."
//             });
//         }
      
        
//     } else {
//         res.status(404).send({
//             message: 'Log in or Create an Account.'
//         })
//     }
// }

