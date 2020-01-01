const mongoose = require("mongoose");

export const schema = new mongoose.Schema({
    name: { type: String },
    location: { type: String },
    productTypes: { type: String },
    contactPerson: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    website: { type: String },
    notes: { type: String }
}).set("toObject", { virtuals: true });
