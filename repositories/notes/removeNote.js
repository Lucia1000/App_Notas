const getPool = require("../../database/getPool");

const removeNote = async (id) => {
  const pool = getPool();

  const [{ affectedRows }] = await pool.query(
    "DELETE FROM notes WHERE id = ?",
    [id]
  );

  return affectedRows;
};

module.exports = removeNote;
