const router = require("express").Router();
const userServices = require("../../services/user/index");
const { upload } = require("../../utils/multer"); 

router.post("/user/sign-up/job-seeker", upload.fields([  { name: 'profile_pic', maxCount: 1 },  { name: 'resume', maxCount: 1 }]), userServices.signUpJobSeeker);
router.post("/user/sign-up/recruiter", upload.single('profile_pic'), userServices.signUpRecruiter);
router.post("/user/login", userServices.login);

module.exports = router;