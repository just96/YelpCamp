const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

// Definir o schema do Campground (estrutura dos documentos)
const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

// Criar e exportar o model baseado no schema
module.exports = mongoose.model("Campground", CampgroundSchema);
