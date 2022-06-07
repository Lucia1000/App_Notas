const getPool = require("../../database/getPool");

const updateNoteById = async ({ title, text, category, id }) => {
  const pool = getPool();

  const [{ affectedRows }] = await pool.query(
    "UPDATE notes SET title = ?, text = ?, category = ? WHERE id = ?",
    [title, text, category, id] //el id de la note
  );

  return affectedRows;
};

module.exports = updateNoteById;
