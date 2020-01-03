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
});

export default mongoose.model("Producer", producerSchema);
