const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
main()
  .then(() => {
    console.log("connect to DB");
  })
  .catch((err) => {
    console.log("error in database connection");
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6858d47a549f1436bb385538",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was intilazied");
};

initDB();
