const express = require("express");
const router = express.Router();

const {
  getLoanApplication,
  getDealerProfile,
  updateLoanPayment,
  updateDocumentChassis,
  updateDocumentMotor,
  updateDocumentBattery,
  updateDocumentPassbook,
  updateDocumentCustomer,
  updateDocumentInvoice,
  updateDocumentNach,
  updateDocumentInsurance,
  updateDocumentDispatch,
  updateDocumentRC,
} = require("../controllers/dealerController");

router.get("/loan", getLoanApplication);
router.post("/loan/:loanId/pay", updateLoanPayment);
router.get("/profile", getDealerProfile);
router.post("/documents/chassis", updateDocumentChassis);
router.post("/documents/motor", updateDocumentMotor);
router.post("/documents/battery", updateDocumentBattery);
router.post("/documents/passbook", updateDocumentPassbook);
router.post("/documents/customer", updateDocumentCustomer);
router.post("/documents/invoice", updateDocumentInvoice);
router.post("/documents/nach", updateDocumentNach);
router.post("/documents/insurance", updateDocumentInsurance);
router.post("/documents/dispatch", updateDocumentDispatch);
router.post("/documents/rc", updateDocumentRC);

module.exports = router;
