const express = require("express");
const app = express();
const FileRouter = require("./routers/fileRouter");

const DB = require("./connect/db");
DB();

app.use("/api/v1", FileRouter);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
   console.log("server ishga tushdi");
});

//DpWTaaIwOr8wey6N
