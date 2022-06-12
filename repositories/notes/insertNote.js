const getPool = require("../../database/getPool");

const insertNote = async ({
  title,
  text,
  category,
  status,
  imageName,
  userId,
}) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO notes (title, text, category, status, image, user_id) VALUES (?, ?, ?, ?, ?, ?)",
    [title, text, category, status, imageName, userId]
  );

  return insertId;
};

module.exports = insertNote;
