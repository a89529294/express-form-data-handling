const usersStorage = require("../storages/users-storage");
const { body, validationResult, query } = require("express-validator");

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("create-user", {
    title: "Create user",
  });
};

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("email").trim().isEmail().withMessage(`Must be a valid email address`),
  body("age")
    .optional({ values: "falsy" })
    .isInt({ min: 18, max: 120 })
    .withMessage("Must be between 18 and 120"),
  body("bio")
    .trim()
    .isLength({ min: 0, max: 200 })
    .withMessage("must be less than or equal to 200 characters")
    .escape(),
];

exports.usersCreatePost = [
  ...validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("create-user", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("update-user", {
    title: "Update user",
    user: user,
  });
};

exports.usersUpdatePost = [
  ...validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("update-user", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.updateUser(req.params.id, {
      firstName,
      lastName,
      email,
      age,
      bio,
    });
    res.redirect("/");
  },
];

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};

const validateSearch = [
  query("name")
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage("Name must be between 1 and 10 characters"),
];

exports.usersSearchGet = [
  validateSearch,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("search", {
        errors: errors.array(),
      });
    }

    const users = usersStorage.getUsers();
    res.render("search", {
      users: users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(req.query.name.toLowerCase()) ||
          user.lastName.toLowerCase().includes(req.query.name.toLowerCase())
      ),
    });
  },
];
