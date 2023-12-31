const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const ctrls = require("../controllers/order");
const uploader = require("../config/cloudinary.config");

router.post("/", verifyAccessToken, ctrls.createOrder);
router.put("/status/:oid", verifyAccessToken, isAdmin, ctrls.updateStatus);
router.get("/admin", verifyAccessToken, isAdmin, ctrls.getUserOrders);
router.delete("/:oid", verifyAccessToken, ctrls.deleteOrders);
router.get("/", verifyAccessToken, ctrls.getUserOrder);

module.exports = router;
