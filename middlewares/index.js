const validateAuth = require("./validateAuth");
const checkAdmin = require("./checkAdmin");
const notFound = require("./notFound");
const handleError = require("./handleError");

module.exports = { validateAuth, notFound, handleError };
