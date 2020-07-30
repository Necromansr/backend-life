const express = require('express'),
      router = express.Router();
      controllers = require('./controllers/index');
      let middleware = require('./middleware');
router.get('/', (req,res)=>{return res.sendStatus(404);})

router.route('/user')
      .post(controllers.User.createUser)
      .get(middleware.checkToken,controllers.User.showUser)
      .put(middleware.checkToken, controllers.User.updateUser)

router.post("/login",controllers.User.login)
router.get("/logout",controllers.User.logout)
router.get("/allUser",controllers.User.showAllUser)
router.get("/userId",controllers.User.showUserId)
router.post("/feedback",controllers.User.feedback)
router.post("/repassword",controllers.User.repassword)
// router.route("/institution")
//       .post(controllers.Institution.createInstitution)
//       .get(controllers.Institution.showInstitution)
//       .put(controllers.Institution.updateInstitution)
//       .delete(controllers.Institution.destroyInstitution)

// router.get("/allInstitution",controllers.Institution.showAllInstitution)
// router.get("/institutionId",controllers.Institution.showInstitutionId)
// router.delete("/deleteImageInstitution",controllers.Institution.deleteImageInstitution)

router.route("/place")
      .post(middleware.checkToken,controllers.Place.createPlace)
      .put(middleware.checkToken,controllers.Place.updatePlace)
      .delete(middleware.checkToken,controllers.Place.destroyPlace)

router.get("/showplace",controllers.Place.showPlace)

router.get("/allPlace",controllers.Place.showAllPlace)
router.get("/placeId",controllers.Place.showPlaceId)
router.get("/placeUser",middleware.checkToken,controllers.Place.showPlaceUser)
router.delete("/deleteImagePlace",controllers.Place.deleteImagePlace)
// router.get("/history",middleware.checkToken, controllers.History.showHistory)

// router.route('/favorite')
//       .post(middleware.checkToken,controllers.Favorite.createFavorite)
//       .get(middleware.checkToken,controllers.Favorite.showFavorite)
//       .delete(middleware.checkToken,controllers.Favorite.destroyFavorite)

router.route('/answer')
      .post(controllers.Answer.createAnswer)
      .get(controllers.Answer.showAnswer)

router.route('/review')
      .post(controllers.Review.createReview)
      .get(controllers.Review.showReview)

router.route('/like')
      .post(controllers.Review.createLike)

module.exports = router;
