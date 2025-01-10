const PartnerCode = require("../models/partnerModel");
const Loan = require("../models/loanModel");
const User = require("../models/User");
const Document = require("../models/documentModel");

exports.getLoanApplication = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getDocument = async (req, res) => {
  const { loanId } = req.params;
  // console.log(req.params);
  try {
    // Find the document by loanId
    let document = await Document.findOne({ loanId });

    res.status(201).json({
      message: "Document fetched successfully",
      document,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ error: "Failed to update document" });
  }
};
exports.updateLoanStatus = async (req, res) => {
  const { loanId, status } = req.params;

  try {
    // Find the loan document by loanId
    const loan = await Loan.findOne({ loanId });
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    // Update loan status
    loan.status = status;
    await loan.save();

    res.status(200).json({
      message: "Loan status updated successfully",
      loan,
    });
  } catch (error) {
    console.error("Error updating loan status:", error);
    res.status(500).json({ error: "Failed to update loan status" });
  }
};
