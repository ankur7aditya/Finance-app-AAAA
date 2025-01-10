const mongoose = require("mongoose");

const partnerCodeSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  partnerCode: { type: String, required: true },
  partnerName: { type: String, required: true },
});

module.exports = mongoose.model("PartnerCode", partnerCodeSchema);
