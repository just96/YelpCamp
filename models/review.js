const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Review schema
const reviewSchema = new Schema({
  body: String,
  rating: Number,
  author: {
    // Author reference
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Export model
module.exports = mongoose.model("Review", reviewSchema);
