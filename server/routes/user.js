const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/register", ctrls.register);
router.post("/login", ctrls.login);
router.get("/current", verifyAccessToken, ctrls.getCurrent);
router.post("/refreshtoken", ctrls.refreshAccessToken);
router.get("/logout", ctrls.logout);
router.get("/forgotpassword", ctrls.forgotPassword);
router.put("/resetpassword", ctrls.resetPassword);
router.get("/", [verifyAccessToken, isAdmin], ctrls.getUsers); // role là user thì cook nhé
router.delete("/", [verifyAccessToken, isAdmin], ctrls.deleteUser); // role là user thì cook nhé
router.put("/current", [verifyAccessToken], ctrls.updateUser);
router.put("/:uid", [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin); // role là user thì cook nhé

module.exports = router;

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE
// CREATE (POST) + PUT - body (không bị lộ trên trình duyệt)
// GET + DELETE - query (bị lộ trên trình duyệt) ?sdfvccsdasda
