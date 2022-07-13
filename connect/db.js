const mongoose = require("moongoose");
const dotenv = require("dotenv");
dotenv.config();

const DB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("mongodb ulandi uraaaaa");
   } catch (error) {
      console.log("mongodb ulanmadi");
   }
};

module.exports = DB;
