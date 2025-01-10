const express = require("express");
const multer = require("multer");
const { uploadFileToS3 } = require("../middlewares/uploadMiddleware"); // Import the S3 upload function
const {
  uploadLoanApplication,
  updateDocumentPan,
  updateDocumentAadharFront,
  updateDocumentAadharaBack,
  updateDocumentProfile,
  getPartner,
} = require("../controllers/customerController"); // Import the controller function

const router = express.Router();

// Multer configuration: Store the files in memory
const storage = multer.memoryStorage(); // Store files in memory instead of disk
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 70 * 1024 * 1024, // Limit each file size to 70MB
    fieldSize: 70 * 1024 * 1024, // Limit each field value to 70MB
    fields: 200, // Maximum number of fields allowed
  },
});
// Route for loan application upload
router.post("/upload-loan", uploadLoanApplication);
router.post("/upload-loan/pan", updateDocumentPan);
router.post("/upload-loan/aadhar-front", updateDocumentAadharFront);
router.post("/upload-loan/aadhar-back", updateDocumentAadharaBack);
router.post("/upload-loan/profile", updateDocumentProfile);
router.get("/partner",getPartner);

module.exports = router;
