const PartnerCode = require("../models/partnerModel");
const Loan = require("../models/loanModel");
const User = require("../models/User");
const Document = require("../models/documentModel");

exports.getLoanApplication = async (req, res) => {
  try {
    const dealerEmail = req.query.email; // Email of the logged-in dealer

    if (!dealerEmail) {
      return res.status(400).json({ error: "Dealer email is required" });
    }

    // Find the partner code for the dealer's email
    const partner = await PartnerCode.findOne({ email: dealerEmail });
    // console.log(partner);
    if (!partner) {
      return res
        .status(404)
        .json({ error: "Partner code not found for this dealer" });
    }

    // Fetch loans based on the partner code
    const loans = await Loan.find({ partner: partner.partnerCode });

    res.status(200).json(loans);
  } catch (err) {
    console.error("Error fetching loans by partner:", err.message);
    res.status(500).json({ error: "Server error while fetching loans" });
  }
};

exports.updateLoanPayment = async (req, res) => {
  const { loanId } = req.params;
  const emiDetails = req.body;

  try {
    // Find the loan by its ID
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    // Add the new payment to the emiPayments array
    loan.emiPayments.push(emiDetails);

    // Update the remaining amount
    loan.remainingAmount = loan.remainingAmount - emiDetails.amountPaid;

    // Save the updated loan
    await loan.save();

    res.status(200).json(loan); // Send the updated loan back as a response
  } catch (err) {
    console.error("Error processing EMI payment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getDealerProfile = async (req, res) => {
  const { email } = req.query; // Use query to fetch email
  console.log(email);
  try {
    // Find the user by their email
    const profile = await User.findOne({ email });

    if (!profile) {
      return res.status(404).json({ error: "Dealer not found" });
    }

    // Return the profile details
    res.status(200).json(profile);
  } catch (err) {
    console.error("Error fetching dealer profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateDocumentChassis = async (req, res) => {
  const { loanId, url, chassisNumber } = req.body;
  // console.log(req.body,url);
  try {
    // Find the document by loanId
    let document = await Document.findOne({ loanId });

    if (!document) {
      // If no document exists, create a new one with chassis data
      document = new Document({
        loanId,
        chassisImage: url,
        chassisNumber,
      });
    } else {
      // Update the existing document with new chassis data
      document.chassisImage = url;
      document.chassisNumber = chassisNumber;
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
exports.updateDocumentMotor = async (req, res) => {
  const { loanId, url, motorNumber } = req.body;
  // console.log(req.body,url);
  try {
    // Find the document by loanId
    let document = await Document.findOne({ loanId });

    if (!document) {
      // If no document exists, create a new one with chassis data
      document = new Document({
        loanId,
        motorImage: url,
        motorNumber,
      });
    } else {
      // Update the existing document with new chassis data
      document.motorImage = url;
      document.motorNumber = motorNumber;
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
exports.updateDocumentBattery = async (req, res) => {
  const { loanId, url, batterySerialNumber } = req.body;
  // console.log(req.body,url);
  try {
    // Find the document by loanId
    let document = await Document.findOne({ loanId });

    if (!document) {
      // If no document exists, create a new one with chassis data
      document = new Document({
        loanId,
        batteryImage: url,
        batterySerialNumber,
      });
    } else {
      // Update the existing document with new chassis data
      document.batteryImage = url;
      document.batterySerialNumber = batterySerialNumber;
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
exports.updateDocumentPassbook = async (req, res) => {
  const { loanId, url, accountNumber } = req.body;
  // console.log(req.body,url);
  try {
    // Find the document by loanId
    let document = await Document.findOne({ loanId });

    if (!document) {
      // If no document exists, create a new one with chassis data
      document = new Document({
        loanId,
        passbookImage: url,
        accountNumber,
      });
    } else {
      // Update the existing document with new chassis data
      document.passbookImage = url;
      document.accountNumber = accountNumber;
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

exports.updateDocumentCustomer = async (req, res) => {
  const { loanId, url, customerWithVehicleDesc } = req.body;
  // console.log(req.body,url);
  try {
    // Find the document by loanId
    let document = await Document.findOne({ loanId });

    if (!document) {
      // If no document exists, create a new one with chassis data
      document = new Document({
        loanId,
        customerWithVehicleImage: url,
        customerWithVehicleDesc,
      });
    } else {
      // Update the existing document with new chassis data
      document.customerWithVehicleImage = url;
      document.customerWithVehicleDesc = customerWithVehicleDesc;
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
exports.updateDocumentInvoice = async (req, res) => {
  const {
    loanId,
    url,
    invoiceNumber,
    manufacturingYear,
    vehicleUsageType,
    rtoCode,
    exShowroomPrice,
    downPayment,
    rtoCharge,
    otherCharge,
    onRoadPrice,
    description,
  } = req.body;
  // console.log(req.body,url);
  try {
    // Find the document by loanId
    let document = await Document.findOne({ loanId });

    if (!document) {
      // If no document exists, create a new one with chassis data
      document = new Document({
        loanId,
        invoiceImage: url,
        invoiceNumber,
        manufacturingYear,
        vehicleUsageType,
        rtoCode,
        exShowroomPrice,
        downPayment,
        rtoCharge,
        otherCharge,
        onRoadPrice,
        description,
      });
    } else {
      // Update the existing document with new chassis data
      document.invoiceImage = url;
      document.invoiceNumber = invoiceNumber;
      document.manufacturingYear = manufacturingYear;
      document.vehicleUsageType = vehicleUsageType;
      document.rtoCode = rtoCode;
      document.exShowroomPrice = exShowroomPrice;
      document.downPayment = downPayment;
      document.rtoCharge = rtoCharge;
      document.otherCharge = otherCharge;
      document.onRoadPrice = onRoadPrice;
      document.description = description;
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

exports.updateDocumentNach = async (req, res) => {
  const { loanId, url, nachDescription } = req.body;
  // console.log(req.body,url);
  try {
    // Find the document by loanId
    let document = await Document.findOne({ loanId });

    if (!document) {
      // If no document exists, create a new one with chassis data
      document = new Document({
        loanId,
        nachImage: url,
        nachDescription,
      });
    } else {
      // Update the existing document with new chassis data
      document.nachImage = url;
      document.nachDescription = nachDescription;
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
exports.updateDocumentInsurance = async (req, res) => {
  const { loanId, url, insurancePolicyNumber } = req.body;
  // console.log(req.body,url);
  try {
    // Find the document by loanId
    let document = await Document.findOne({ loanId });

    if (!document) {
      // If no document exists, create a new one with chassis data
      document = new Document({
        loanId,
        insuranceImage: url,
        insurancePolicyNumber,
      });
    } else {
      // Update the existing document with new chassis data
      document.insuranceImage = url;
      document.insurancePolicyNumber = insurancePolicyNumber;
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
exports.updateDocumentDispatch = async (req, res) => {
  const { loanId, url, vehicleDispatchIDNumber } = req.body;
  // console.log(req.body,url);
  try {
    // Find the document by loanId
    let document = await Document.findOne({ loanId });

    if (!document) {
      // If no document exists, create a new one with chassis data
      document = new Document({
        loanId,
        vehicleDispatchIDImage: url,
        vehicleDispatchIDNumber,
      });
    } else {
      // Update the existing document with new chassis data
      document.vehicleDispatchIDImage = url;
      document.vehicleDispatchIDNumber = vehicleDispatchIDNumber;
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
exports.updateDocumentRC = async (req, res) => {
  const { loanId, url, rcUploadNumber } = req.body;
  // console.log(req.body,url);
  try {
    // Find the document by loanId
    let document = await Document.findOne({ loanId });

    if (!document) {
      // If no document exists, create a new one with chassis data
      document = new Document({
        loanId,
        rcUploadImage: url,
        rcUploadNumber,
      });
    } else {
      // Update the existing document with new chassis data
      document.rcUploadImage = url;
      document.rcUploadNumber = rcUploadNumber;
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
