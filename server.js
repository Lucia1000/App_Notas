require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const { SERVER_PORT } = process.env;

const app = express();

const { notFound, handleError, validateAuth } = require("./middlewares");

const {
  registerUser,
  activateUser,
  loginUser,
} = require("./controllers/users"); //Coge el index por defecto

const {
  getNotes,
  getNoteById,
  createNote,
  editNote,
  deleteNote,
} = require("./controllers/notes");

app.use(express.json());
app.use(morgan("dev"));

// //Endpoints usuarios
app.post("/users", registerUser);
app.get("/users/activate/:registrationCode", activateUser); //cambio el put por el get(pequeña trampa para q lleque activar al correo)
app.post("/login", loginUser);

// //Endpoints notes
app.get("/notes", validateAuth, getNotes);
app.get("/notes/:idNote", validateAuth, getNoteById);
app.post("/notes", validateAuth, createNote);
app.put("/notes/:idNote", validateAuth, editNote);
app.delete("/notes/:idNote", validateAuth, deleteNote);

/** Middleware 404(normal)*/
app.use(notFound);

/** Middleware error */
app.use(handleError);

//Enpoints

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on http://localhost:${SERVER_PORT} 👌🏼 `);
});
