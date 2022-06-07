const getPool = require("../../database/getPool");

const insertNote = async ({ title, text, category, userId }) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO notes (title, text, category, user_id) VALUES (?, ?, ?, ?)",
    [title, text, category, userId]
  );

  return insertId;
};

module.exports = insertNote;
