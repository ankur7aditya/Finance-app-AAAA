const Loan = require("../models/loanModel");
const { uploadFileToS3 } = require("../middlewares/uploadMiddleware"); // Utility for S3 upload
const crypto = require("crypto");
const Document = require("../models/documentModel");
const PartnerCode = require("../models/partnerModel");

require("dotenv").config();
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;

exports.uploadLoanApplication = async (req, res) => {
  try {
    // Extract fields from req.body
    const {
      name,
      gender,
      dob,
      maritalStatus,
      education,
      occupation,
      fatherName,
      dependants,
      pinCode,
      city,
      state,
      email,
      phone,
      address,
      isCurrentAddress,
      duplicateAddress,
      loanAmount,
      loanType,
      loanPurpose,
      loanTenure,
      partner,
      monthlyIncome,
      householdIncome,
      vehicleModel,
      startingEmiDate,
    } = req.body;

    // const generateFileName = (bytes = 32) =>
    //   crypto.randomBytes(bytes).toString("hex");

    // // Extract files from req.files
    // const files = req.files;

    // Check if required fields are provided
    // if (
    //   !name ||
    //   !loanAmount ||
    //   !loanType ||
    //   !files
    //   // Object.keys(files).length === 0
    // ) {
    //   return res.status(400).json({
    //     error: "Missing required fields or no files uploaded",
    //   });
    // }

    // Initialize file upload results
    // let panImageUrl = null;
    // let aadharFrontImageUrl = null;
    // let aadharBackImageUrl = null;
    // let profilePicUrl = null;

    // Upload files to S3 and collect URLs
    // if (files.panImage) {
    //   const imageName = generateFileName();
    //   panImageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${imageName}`;
    //   const temp = await uploadFileToS3(files.panImage); // Upload pan image to S3
    // }

    // if (files.aadharFrontImage) {
    //   const imageName = generateFileName();
    //   aadharFrontImageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${imageName}`;
    //   const temp = await uploadFileToS3(files.aadharFrontImage); // Upload Aadhar front image to S3
    // }

    // if (files.aadharBackImage) {
    //   const imageName = generateFileName();
    //   aadharBackImageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${imageName}`;
    //   const temp = await uploadFileToS3(files.aadharBackImage); // Upload Aadhar back image to S3
    // }

    // if (files.profilePic) {
    //   const imageName = generateFileName();
    //   profilePicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${imageName}`;
    //   const temp = await uploadFileToS3(files.profilePic); // Upload profile picture to S3
    // }

    // Create a new loan application with the uploaded image URLs
    const loan = new Loan({
      name,
      gender,
      dob,
      maritalStatus,
      education,
      occupation,
      fatherName,
      dependants,
      pinCode,
      city,
      state,
      email,
      emiPayments: [
        {
          paymentDate: null,
          amountPaid: 0,
        },
      ],
      phone,
      address,
      isCurrentAddress,
      duplicateAddress,
      loanAmount,
      loanType,
      loanPurpose,
      loanTenure,
      partner,
      monthlyIncome,
      householdIncome,
      remainingAmount: loanAmount,
      vehicleModel,
      status: "Pending", // Default value
      startingEmiDate,
    });

    // Save the loan application to the database
    await loan.save();

    // Respond with success
    res.status(201).json({
      message: "Loan application submitted successfully",
      loan,
    });
  } catch (err) {
    console.error("Error in uploadLoanApplication:", err.message);
    res
      .status(500)
      .json({ error: "Server error while submitting loan application" });
  }
};

exports.getPartner = async (req, res) => {
  try {
    const partner = await PartnerCode.find();
    res.json(partner);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateDocumentPan = async (req, res) => {
  const { loanId, url, panNumber } = req.body;
  // console.log(req.body,url);
  try {
    // Find the document by loanId
    let document = await Document.findOne({ loanId });

    if (!document) {
      // If no document exists, create a new one with chassis data
      document = new Document({
        loanId,
        panImage: url,
        panNumber,
      });
    } else {
      // Update the existing document with new chassis data
      document.panImage = url;
      document.panNumber = panNumber;
    }

    // Save the updated document
    await document.save();

    res.status(201).json({
      message: "Document updated successfully",
      document,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ error: "Failed to update document" });
  }
};

exports.updateDocumentAadharFront = async (req, res) => {
  const { loanId, url, aadharNumber } = req.body;
  // console.log(req.body,url);
  try {
    // Find the document by loanId
    let document = await Document.findOne({ loanId });

    if (!document) {
      // If no document exists, create a new one with chassis data
      document = new Document({
        loanId,
        aadharImageFront: url,
        aadharNumber,
      });
    } else {
      // Update the existing document with new chassis data
      document.aadharImageFront = url;
      document.aadharNumber = aadharNumber;
    }

    // Save the updated document
    await document.save();

    res.status(201).json({
      message: "Document updated successfully",
      document,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ error: "Failed to update document" });
  }
};
exports.updateDocumentAadharaBack = async (req, res) => {
  const { loanId, url } = req.body;
  // console.log(req.body,url);
  try {
    // Find the document by loanId
    let document = await Document.findOne({ loanId });

    if (!document) {
      // If no document exists, create a new one with chassis data
      document = new Document({
        loanId,
        aadharImageBack: url,
      });
    } else {
      // Update the existing document with new chassis data
      document.aadharImageBack = url;
    }

    // Save the updated document
    await document.save();

    res.status(201).json({
      message: "Document updated successfully",
      document,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ error: "Failed to update document" });
  }
};

exports.updateDocumentProfile = async (req, res) => {
  const { loanId, url } = req.body;
  // console.log(req.body,url);
  try {
    // Find the document by loanId
    let document = await Document.findOne({ loanId });

    if (!document) {
      // If no document exists, create a new one with chassis data
      document = new Document({
        loanId,
        profilePic: url,
      });
    } else {
      // Update the existing document with new chassis data
      document.profilePic = url;
    }

    // Save the updated document
    await document.save();

    res.status(201).json({
      message: "Document updated successfully",
      document,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ error: "Failed to update document" });
  }
};
