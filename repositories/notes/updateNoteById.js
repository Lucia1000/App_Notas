const getPool = require("../../database/getPool");

const updateNoteById = async ({ title, text, category, status, id }) => {
  const pool = getPool();

  const [{ affectedRows }] = await pool.query(
    "UPDATE notes SET title = ?, text = ?, category = ? , status = ? WHERE id = ?",
    [title, text, category, status, id] //el id de la note
  );

  return affectedRows;
};

module.exports = updateNoteById;
