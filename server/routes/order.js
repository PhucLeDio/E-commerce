const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const ctrls = require("../controllers/order");
const uploader = require("../config/cloudinary.config");

router.post("/", verifyAccessToken, ctrls.createOrder);

module.exports = router;
