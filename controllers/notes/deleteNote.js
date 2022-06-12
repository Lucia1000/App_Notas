const { removeNote, selectNoteById } = require("../../repositories/notes");
const { generateError } = require("../../helpers");

const deleteNote = async (req, res, next) => {
  try {
    const { idNote } = req.params;

    const note = await selectNoteById(idNote);

    if (!note) {
      generateError("Note does not exist", 404);
    }
    if (note.user_id !== req.auth.id) {
      generateError("You can't delete someone else's note", 400);
    }

    await removeNote(idNote);

    res.status(200).send({ status: "ok", message: "Note deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteNote;
