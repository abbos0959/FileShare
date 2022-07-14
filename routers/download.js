const router=require("express").Router()

const File=require("../models/fileModel")



router.get("/:uuid", async(req,res)=>{
const file=await File.findOne({uuid:req.params.uuid})
if(!file){
    return res.render("download",{error:"link muddati tugadi rais"})
}
})

module.exports=router