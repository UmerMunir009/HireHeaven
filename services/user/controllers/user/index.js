const router = require("express").Router();
const userServices = require("../../services/user/index");
const { upload } = require("../../utils/multer"); 

router.get("/user/profile", userServices.getProfile);
router.get("/user/profile/:id", userServices.getPublicProfile);

router.post("/user/skill", userServices.addSkill);
router.delete("/user/skill/:id", userServices.deleteSkill);


module.exports = router;