const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
   {
      filename: { type: String, require: true },
      path: { type: String, require: true },
      size: { type: Number, require: true },
      uuid: { type: String, require: true },
      sender: { type: String, require: false },
      receiver: { type: String, require: false },
   },

   {
      timestamps: true,
   }
);
module.exports =  mongoose.model("file", Schema);
