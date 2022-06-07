const getPool = require("../../database/getPool");

const deleteNoteById = async (id) => {
  const pool = getPool();

  const [[note]] = await pool.query("DELETE * FROM notes WHERE id = ?", [id]);

  return note;
};

module.exports = deleteNoteById;
