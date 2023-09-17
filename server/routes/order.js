const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const ctrls = require("../controllers/order");
const uploader = require("../config/cloudinary.config");

router.post("/", verifyAccessToken, ctrls.createOrder);
router.put("/status/:oid", verifyAccessToken, isAdmin, ctrls.updateStatus);
router.get("/", verifyAccessToken, ctrls.getUserOrder);
router.get("/admin", verifyAccessToken, isAdmin, ctrls.getUserOrders);

module.exports = router;
