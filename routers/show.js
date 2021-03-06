const router = require("express").Router();
const File = require("../models/fileModel");

router.get("/:uuid", async (req, res) => {
   try {
      const file = await File.findOne({ uuid: req.params.uuid });
      if (!file) {
         return res.render("download", { error: "link muddati tugadi" });
      }
      return res.render("download", {
         uuid: file.uuid,
         fileName:file.filename,
         fileSize:file.size,
         downloadLink:`${process.env.APP_URL}/files/download/${file.uuid}`
      });
   } catch (error) {
      return res.render("download", { error: "nimadir xato ketdi" });
   }
});

module.exports = router;
