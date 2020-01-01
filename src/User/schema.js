const mongoose = require("mongoose");

export const schema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
}).set("toObject", { virtuals: true });
