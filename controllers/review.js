const crypto = require('crypto'),
    models = require('../models/index');



exports.createReview  = async (req,res)=>{
    try {
        let review = await models.Review.create({
            id_place: req.body.id,
            id_user: req.body.id_user,
            name: req.body.name,
            message: req.body.message,
            rating: req.body.rating
        })
        res.status(201).send({
            message: 'Review add succesfully.',
        });
        } catch(e){
            console.log(e);
            res.status(400).send({
                message: "Failed to add review."
            });
        }
}

exports.createLike = async (req, res) => {
    try{
    let like = await models.Like.create({
        id_review: req.body.id,
        id_user: req.body.id_user
    })
    res.status(201).send({
        message: 'Like add succesfully.',
    });
    } catch(e){
        console.log(e);
        res.status(400).send({
            message: "Failed to add like."
        });
    }
}

exports.showReview  = async (req,res)=>{
    let review = await models.Review.findAll({attributes: ["id",
    "name","rating","message", "id_user", "createdAt"],raw: true,
        where:{id_place:req.query.id}
    })
    let result = review.map( async x=>{
        try{
            let answer = await models.Answer.findAll({attributes: ["id",
            "name","message", "id_user"],raw: true,
                where:{id_review:x.id}
            })
            let results = answer.map( async y=>{
                try{
                    let user = await models.User.findOne({attributes: ["name",
            "avatar"], raw: true, where: { id: y.id_user } });
                    return {
                        id: y.id,
                        name:user.name,
                        avatar: user.avatar,
                        id_user: y.id_user,
                        message:y.message,
                    }
                }catch(e){
                    console.log(e)
                }
            })
            let like = await models.Like.findAll({attributes: ["id_review","id_user"],raw: true,
                where:{id_review:x.id}
            })
            let user = await models.User.findOne({attributes: ["name",
    "avatar"], raw: true, where: { id: x.id_user } });
            return {
                id: x.id,
                name:user.name,
                avatar: user.avatar,
                message:x.message,
                answer: await Promise.all(results).then(x=> x),
                like: like,
                rating: x.rating,
                date: x.createdAt
            }
        }catch(e){
            console.log(e)
        }
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

