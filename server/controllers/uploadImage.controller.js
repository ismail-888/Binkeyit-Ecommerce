import uploadImageClodinary from "../utils/uploadImageClodinary.js";

const uploadImageController = async (req, res) => {
  try {
    const file = req.file;

    const uploadImage = await uploadImageClodinary(file);
    return res.json({
      message: "Upload done",
      data: uploadImage,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      error: true,
      success: false,
    });
  }
};

export default uploadImageController;
