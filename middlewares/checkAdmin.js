const { generateError } = require("../helpers");

const checkAdmin = async (req, res, next) => {
  try {
    if (req.auth.role !== "admin") {
      generateError("You must be an admin to delete an user", 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkAdmin;
