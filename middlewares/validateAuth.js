const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");

const validateAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers; //trae autorizacion del header

    if (!authorization) {
      generateError("Missing authorization header", 400);
    }

    const [tokenType, token] = authorization.split(" "); //trae formato(Bearer)del token y token

    if (tokenType !== "Bearer" || !token) {
      //comprueba si es Bearer y q haya token
      generateError("Invalid token format", 400);
    }

    const tokenInfo = jwt.verify(token, process.env.JWT_SECRET); //comprueba si token es válido

    req.auth = tokenInfo; //en la req voy a meter una propiedad auth , donde meto la info del token.(id,role,cuando se creo y cuando expira)

    next(); //pasa al controller q va después (en el server)
  } catch (error) {
    next(error); //va al siguiente error con los parámetros(error,req,res,next)
  }
};

module.exports = validateAuth;
