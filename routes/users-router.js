// routes/usersRouter.js
const { Router } = require("express");
const usersController = require("../controllers/users-controller");
const usersRouter = Router();

usersRouter.get("/", usersController.usersListGet);
usersRouter.get("/create", usersController.usersCreateGet);
usersRouter.post("/create", usersController.usersCreatePost);
usersRouter.get("/:id/update", usersController.usersUpdateGet);
usersRouter.post("/:id/update", usersController.usersUpdatePost);
usersRouter.post("/:id/delete", usersController.usersDeletePost);
usersRouter.get("/search", usersController.usersSearchGet);

module.exports = usersRouter;