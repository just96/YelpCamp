const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// User schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// Add passport-local-mongoose plugin for authentication
UserSchema.plugin(passportLocalMongoose);

// Export model
module.exports = mongoose.model("User", UserSchema);
