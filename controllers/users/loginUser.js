const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { selectUserByEmail } = require("../../repositories/users");
const { generateError } = require("../../helpers");

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body; //traemos email y password

    const user = await selectUserByEmail(email); //seleciono de la base de datos el usuario q tenga ese email

    /** Esto sería un código alternativo para validar que exista el usuario y que la password esté bien */
    // if (!user) {
    //   generateError("Wrong password or email", 400);
    // }

    // const encryptedPassword = user?.password;

    // const isPasswordOk = await bcrypt.compare(password, encryptedPassword);

    // if (!isPasswordOk) {
    //   generateError("Wrong password or email", 400);
    // }

    const encryptedPassword = user?.password; //selecciona el password

    const isLoginValid = //true o false
      user && (await bcrypt.compare(password, encryptedPassword));

    if (!isLoginValid) {
      generateError("Wrong password or email", 400);
    }
    //si el usuario tiene un codigo de registro, quiere decir q está sin activar
    if (user.registrationCode) {
      generateError("User not activated. Check your email", 400);
    }
    //lo q queremos guardar en el token
    const tokenPayload = {
      id: user.id,
      role: user.role,
    };
    //genero el token
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).send({ status: "ok", data: { token } }); //le evio el token al usuario
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
