const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  dependants: { type: Number, required: true },
  dob: { type: Date, required: true },
  duplicateAddress: {
    address: { type: String },
    city: { type: String },
    pinCode: { type: Number },
    state: { type: String },
  },
  education: { type: String, required: true },
  email: { type: String },
  emiPaymentDay: { type: Number}, // Day of the month the EMI is due
  emiPayments: [
    {
      paymentDate: { type: Date },
      amountPaid: { type: Number, default: 0 },
    },
  ],
  fatherName: { type: String, required: true },
  gender: { type: String, required: true },
  householdIncome: { type: Number, required: true },
  //images: [{ type: String }], // URLs provided by the frontend
  isCurrentAddress: { type: Boolean, default: true },
  loanAmount: { type: Number, required: true },
  loanPurpose: { type: String, required: true },
  loanTenure: { type: Number, required: true },
  loanType: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  monthlyIncome: { type: Number, required: true },
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  partner: { type: String, required: true },
  phone: { type: String, required: true },
  pinCode: { type: String, required: true },
  profilePic: { type: String },
  remainingAmount: { type: Number }, // Residual loan amount after each EMI
  startingEmiDate: { type: Date },
  state: { type: String, required: true },
  status: { type: String, default: "Pending" },
  vehicleModel: { type: String },
});

module.exports = mongoose.model("Loan", loanSchema);
