const { selectNoteById, updateNoteById } = require("../../repositories/notes");
const { generateError } = require("../../helpers");

const editNote = async (req, res, next) => {
  try {
    const { idNote } = req.params;

    const noteDB = await selectNoteById(idNote);

    if (!noteDB) {
      generateError("Note does not exist", 404);
    }

    const userId = req.auth.id;

    if (noteDB.user_id !== userId) {
      generateError("You cant update someone else's note", 400); //solo puede editar la nota  el propio usuario
    }

    await updateNoteById({ ...noteDB, ...req.body }); //hago copia de las note de la base de datos y sobrescribo con los datos del body

    res.status(200).send({ status: "ok", message: "Note updated" });
  } catch (error) {
    next(error);
  }
};

module.exports = editNote;
