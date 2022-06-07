const getPool = require("../../database/getPool");

const insertUser = async ({
  email,
  encryptedPassword,
  name,
  registrationCode,
}) => {
  const pool = getPool();
  //creo nuevo usuario
  const [{ insertId }] = await pool.query(
    "INSERT INTO users (email, password, name, registrationCode) VALUES (?, ?, ?, ?)",
    [email, encryptedPassword, name, registrationCode]
  );
  //devuelvo la id del usuario
  return insertId;
};

module.exports = insertUser;
