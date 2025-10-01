YelpCamp

A web application where users can create, search, and review campgrounds.
Full-stack project built with Node.js, Express, and MongoDB.

Features

User authentication (login/register)

Campgrounds CRUD (create, edit, delete, list)

Reviews and ratings

Image upload

Map location (Maptiler)

Responsive UI with EJS + Bootstrap

Tech Stack

Backend: Node.js + Express

Database: MongoDB + Mongoose

Frontend: EJS + Bootstrap

Extras: Passport.js, Cloudinary, Maptiler

Run Locally
git clone <repo-url>
cd YelpCamp
npm install


Create a .env file with:

DB_URL=<your MongoDB connection>
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_KEY=<key>
CLOUDINARY_SECRET=<secret>
MAPTILER_API_KEY=<token>
SECRET=<yoursecret>


Then run:

npm start


App available at:
👉 http://localhost:3000 || https://yelpcamp-a5ff.onrender.com/
