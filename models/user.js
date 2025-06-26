const { string, required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passLocalMongoose); //implents all the username hashed password directly
module.exports = mongoose.model("user", userSchema);
