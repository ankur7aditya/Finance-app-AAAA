const express = require("express");
const router = express.Router();
const { getLoanApplication, getDocument,updateLoanStatus } = require("../controllers/adminController");

router.get("/loans", getLoanApplication);
router.get("/loans/documents/:loanId", getDocument);
router.post("/loans/approve/:loanId/:status", updateLoanStatus);

module.exports = router;