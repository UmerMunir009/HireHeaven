const router = require("express").Router();
const userServices = require("../../services/user/index");

router.post("/login", userServices.login); 
// router.post("/user/create", userServices.create);   
// router.get("/user/get", userServices.get);   
// router.delete("/user/:id", userServices.del);   
// router.patch("/user/:id", userServices.update);   


module.exports = router;