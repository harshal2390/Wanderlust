require("dotenv").config();

const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
const dbUrl = process.env.ATLASDB_URL;
console.log("Connecting to:", dbUrl);
main()
  .then(() => {
    console.log("connect to DB");
  })
  .catch((err) => {
    console.log("error in database connection");
  });
async function main() {
  try {
    await mongoose.connect(dbUrl);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "685d2c66fa036cb99649453c",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was intilazied");
};

initDB();
