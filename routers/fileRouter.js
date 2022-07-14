const router = require("express").Router();

const multer = require("multer");
const path = require("path");
const {v4:uuid4} =require("uuid")

const File=require("../models/fileModel")

let storage = multer.diskStorage({
   destination: (req, file, cb) => cb(null, "uploads/"),
   filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}- ${Math.round(Math.random() * 1e9)}${path.extname(
         file.originalname
      )}`;
      cb(null, uniqueName);
   },
});
let upload = multer({
   storage,
   limit: { fileSize: 100000 * 100 },
}).single("myfile");

router.post("/", (req, res) => {
    
    
    //faylni saqlash
    
    upload(req, res,  async(err) => {
       //validatsiya qilish
    if (!req.file) {
        return res.status(404).json({ error: "fayl kiritish majburiy bratishka" });
     }
      if (err) {
        return  res.status(500).send({ error: err.message });
      }

      //ma`lumotlarni databasaga saqlash
       const file=new File({
        filename:req.file.filename,
        uuid:uuid4(),
        path:req.file.path,
        size:req.file.size
       })

       const response=await file.save()

       res.status(200).json({file:`${process.env.APP_URL}/api/files/${response.uuid}`})
   });
});

module.exports = router;
