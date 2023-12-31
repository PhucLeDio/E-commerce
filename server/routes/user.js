const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

router.post("/register", ctrls.register);
router.post("/mock", ctrls.createUsers);
router.put("/finalregister/:token", ctrls.finalRegister);
router.post("/login", ctrls.login);
router.get("/current", verifyAccessToken, ctrls.getCurrent);
router.post("/refreshtoken", ctrls.refreshAccessToken);
router.get("/logout", ctrls.logout);
router.post("/forgotpassword", ctrls.forgotPassword);
router.put("/resetpassword", ctrls.resetPassword);
router.get("/", [verifyAccessToken, isAdmin], ctrls.getUsers); // role là user thì cook nhé
router.delete("/:uid", [verifyAccessToken, isAdmin], ctrls.deleteUser); // role là user thì cook nhé
router.put(
  "/current",
  verifyAccessToken,
  uploader.single("avatar"),
  ctrls.updateUser
);
router.put("/address", [verifyAccessToken], ctrls.updateUserAddress);
router.put("/cart", [verifyAccessToken], ctrls.updateCart);
router.delete(
  "/remove-cart/:pid",
  [verifyAccessToken],
  ctrls.removeProductInCart
);
router.put("/wishlist/:pid", [verifyAccessToken], ctrls.updateWishlist);
router.put("/:uid", [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin); // role là user thì cook nhé

module.exports = router;

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE
// CREATE (POST) + PUT - body (không bị lộ trên trình duyệt)
// GET + DELETE - query (bị lộ trên trình duyệt) ?sdfvccsdasda
