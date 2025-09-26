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
      author: "68d41df32c9560af31df0c3e",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus quo pariatur officiis, molestias libero neque culpa veritatis doloremque consequuntur mollitia suscipit, quidem iste assumenda ad. Delectus doloremque ratione sit fuga!",
      price,
    });
    await camp.save();
  }
};

// Run seed and close DB after
seedDB().then(() => {
  mongoose.connection.close();
});
