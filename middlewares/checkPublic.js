const { selectNoteById } = require("../repositories/notes");

const checkPublic = async (req, res, next) => {
  const { idNote } = req.params;

  const note = await selectNoteById(idNote);

  if (note.status === "private") {
    next();
  } else {
    res.status(200).send({ status: "ok", data: note });
  }
};

module.exports = checkPublic;
