const express = require("express");
const app = express();
const FileRouter = require("./routers/fileRouter");
const ShowRouter = require("./routers/show");
const path=require("path")

const DB = require("./connect/db");
DB();


//template engine ejs

app.set("views",path.join(__dirname,"/views"))
app.set("view engine","ejs")
app.use("/api/files", FileRouter);
app.use("/files", ShowRouter);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
   console.log("server ishga tushdi");
});

//DpWTaaIwOr8wey6N
