const { removeNote } = require("../../repositories/notes");
const { generateError } = require("../../helpers");

const deleteNote = async (req, res, next) => {
  try {
    const { idNote } = req.params;
    const affectedRows = await removeNote(idNote);

    if (affectedRows === 0) {
      generateError("Note does not exist", 404);
    }

    // const userId = req.auth.id;

    res.status(200).send({ status: "ok", message: "Note deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteNote;
