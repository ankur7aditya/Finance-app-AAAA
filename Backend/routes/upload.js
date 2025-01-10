const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const crypto = require("crypto");
const { uploadFile, deleteFile, getObjectSignedUrl } = require("../models/s3Config");
const router = express.Router();

const bucketName = process.env.MY_APP_BUCKET_NAME;
const region = process.env.MY_APP_BUCKET_REGION;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");


router.post("/posts", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    const imageName = generateFileName();
    const imageURL = `https://${bucketName}.s3.${region}.amazonaws.com/${imageName}`;

    const fileBuffer = await sharp(file.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();

    await uploadFile(fileBuffer, imageName, file.mimetype);

    const URL = imageURL
    res.status(201).send(URL);
  } catch (error) {
    res.status(500).send({ error: "Error creating post" });
  }
});


// TODO: if delete old loans required, then implement this function to reduce load on AWS S3 bucket
// app.delete("/api/posts/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const post = await Post.findById(id);

//     if (!post) {
//       return res.status(404).send({ error: "Post not found" });
//     }

//     await deleteFile(post.imageName);
//     await post.deleteOne();
//     res.send(post);
//   } catch (error) {
//     res.status(500).send({ error: "Error deleting post" });
//   }
// });

module.exports = router;