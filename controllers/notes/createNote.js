const { insertNote } = require("../../repositories/notes");
const uploadImage = require("../../helpers/uploadFile");

const createNote = async (req, res, next) => {
  try {
    // const { id: userId } = req.auth;

    const userId = req.auth.id; //trae el req.auth(objeto del tokenInfo).id(el id q hay dentro del objeto tokenInfo), q es el id del usuario

    const { title, text, category, status } = req.body;
    const { image } = req.files;

    const imageName = await uploadImage(image.data);

    const insertId = await insertNote({
      title,
      text,
      category,
      status,
      imageName,
      userId,
    });

    res.status(201).send({
      status: "ok",
      data: { id: insertId, title, text, category, status, imageName, userId },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createNote;
