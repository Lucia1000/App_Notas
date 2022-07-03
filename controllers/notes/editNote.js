const { selectNoteById, updateNoteById } = require("../../repositories/notes");
const { generateError } = require("../../helpers");
const { editNoteSchema, idNoteSchema } = require("../../schemas/notes");

const editNote = async (req, res, next) => {
  try {
    const { idNote } = req.params;

    await idNoteSchema.validateAsync(idNote);

    await editNoteSchema.validateAsync(req.body);

    const noteDB = await selectNoteById(idNote);

    if (!noteDB) {
      throw generateError("Note does not exist", 404);
    }

    const userId = req.auth.id;

    if (noteDB.user_id !== userId) {
      throw generateError("You cant update someone else's note", 400); //solo puede editar la nota  el propio usuario
    }

    await updateNoteById({ ...noteDB, ...req.body }); //hago copia de las note de la base de datos y sobrescribo con los datos del body

    res.status(200).send({ status: "ok", message: "Note updated" });
  } catch (error) {
    next(error);
  }
};

module.exports = editNote;
