const mongoose = require("mongoose");

const producerSchema = new mongoose.Schema({
  name: String,
  location: String,
  productTypes: String,
  contactPerson: String,
  phoneNumber: String,
  email: String,
  website: String,
  notes: String
}).set("toObject", { virtuals: true });

export default mongoose.model("Producer", producerSchema);
