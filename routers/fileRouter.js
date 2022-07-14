const router = require("express").Router();

const multer = require("multer");
const path = require("path");
const { v4: uuid4 } = require("uuid");

const File = require("../models/fileModel");

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

   upload(req, res, async (err) => {
      //validatsiya qilish
      if (!req.file) {
         return res.status(404).json({ error: "fayl kiritish majburiy bratishka" });
      }
      if (err) {
         return res.status(500).send({ error: err.message });
      }

      //ma`lumotlarni databasaga saqlash
      const file = new File({
         filename: req.file.filename,
         uuid: uuid4(),
         path: req.file.path,
         size: req.file.size,
      });

      const response = await file.save();

      res.status(200).json({ file: `${process.env.APP_URL}/api/files/${response.uuid}` });
   });
});

router.post("/send", async (req, res) => {
   const { uuid, emailTo, emailFrom } = req.body;
   if (!uuid || !emailFrom || !emailTo) {
   return   res.status(404).json({ error: "hamma formalar to`ldirilishi sharts" });
   }

   //databasadan ma`lumotlarni olish

   const file= await File.findOne({uuid:uuid})

   if(file.sender){
    return   res.status(404).json({ error: "bu emailga yuborilgan" });

   }

   file.sender=emailFrom
   file.receiver=emailTo
   const response=await file.save()


   //emailga yuborish

   const sendMail=require("../services/emailService")
   sendMail({

      from:emailFrom,
      to:emailTo,
      subject:'inshare fayl almashish',
      text:`${emailFrom} sizga bu faylni yubormoqda`,
      html:require("../services/emailTemplate")({
         emailFrom:emailFrom,
         downloadLink:`${process.env.APP_URL}/files/${file.uuid}`,
         size:parseInt(file.size/1000) + "KB",
         expires:"24 soat"
      })

   })
});
module.exports = router;
