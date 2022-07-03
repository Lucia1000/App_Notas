require("dotenv").config();
const bcrypt = require("bcrypt");
const getPool = require("./getPool");

const populateDB = async () => {
  try {
    const pool = getPool();

    console.log("Inserting data in users and notes...");

    await pool.query(
      `INSERT INTO users (email, password, name) VALUES 
      ("Cata@email.com", ?,"Catalina");`,
      [await bcrypt.hash("123456", 10)]
    );

    await pool.query(
      `INSERT INTO notes (title, text, category, image, status, user_id) VALUES
      ("USC", "Grado","Robótica","robot.jpg","private",1);`
    );

    console.log("¡All done!");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

populateDB();
