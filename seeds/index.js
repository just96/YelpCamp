// Seed database for campgrounds
const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// Helper to pick random element
const sample = (array) => array[Math.floor(Math.random() * array.length)];

// Seed function
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "68dae978640f1b235ccc2a21",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus quo pariatur officiis, molestias libero neque culpa veritatis doloremque consequuntur mollitia suscipit, quidem iste assumenda ad. Delectus doloremque ratione sit fuga!",
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dzcnp51if/image/upload/v1759312874/YelpCamp/v5exlt6gsahypj6j8ynm.jpg",
          filename: "YelpCamp/v5exlt6gsahypj6j8ynm",
        },
        {
          url: "https://res.cloudinary.com/dzcnp51if/image/upload/v1759312873/YelpCamp/y9hwcv51uxc2i229ugwt.jpg",
          filename: "YelpCamp/y9hwcv51uxc2i229ugwt",
        },
      ],
    });
    await camp.save();
  }
};

// Run seed and close DB after
seedDB().then(() => {
  mongoose.connection.close();
});
