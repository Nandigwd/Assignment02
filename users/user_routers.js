const { createUser, dashboard ,getUser, updateUser, deleteuser, login} = require("./user_controller");

const router = require("express").Router();

router.post("/", createUser);
router.get("/dashboard", dashboard);
router.get("/:id", getUser);
router.put("/",  updateUser);
router.delete("/", deleteuser);
router.post("/login", login);

module.exports= router; 