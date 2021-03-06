const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const Course = require("../models/courses");
var fs = require('fs');
var path = require('path');
const { PDFNet } = require('@pdftron/pdfnet-node'); 
var cloudinary = require('cloudinary').v2;


cloudinary.config({ 
    cloud_name: 'dexn8tnt9', 
    api_key: '828443825275634', 
    api_secret: 'oYWmlitChe7pZ7K9PatCNZaXfMk' 
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/JPG" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

//Get all the user route
route.get("/", async (req, res) => {
    try {
      const courseData = await Course.find();
      if (courseData.length === 0) {
        res.status(200).send({
          success: true,
          data: courseData,
          message: "No Courses found"
        });
      } else {
        res.status(200).send({
          success: true,
          data: courseData
        });
      }
    } catch (err) {
      res.status(503).send({
        success: false,
        message: "Server error"
      });
    }
  });

  module.exports = route;

   //Register the user route
route.post("/registerCourse", upload.single('img'),  async (req, res) => {
  const { courseTitle, courseDescription, courseContent, courseBenefits,
  courseLength, awardingBody, courseLevel, funding, learningMethods } = req.body;
const path = req.file && req.file.path
const uniqueFileName = courseTitle
try{
  const image = await cloudinary.uploader.upload(path, {
    public_id: `logos/${uniqueFileName}`,
    tags: "logos",
  })
  fs.unlinkSync(path);
  if(image){
    const newCourse = new Course({
      _id: new mongoose.Types.ObjectId(),
      courseTitle,
      courseDescription,
      courseContent,
      courseBenefits,
      courseLength,
      awardingBody,
      courseLevel,
      funding,
      learningMethods,
      img: image && image.url,  
    });
    const response = await newCourse.save();
    if(response){
      res.status(201).json({
        success: true,
        data: response,
        message: "Course Successfully added",
    });
   }
   else{
    res.status(501).json({
      success: false,
      data: [],
      message: "Error while adding course",
    });
   }
}

}
catch (error) {
  res.status(501).json({
    success: false,
    data: [],
    message: error.message,
  });
}
})


 route.get("/generate",(req,res)=>{
   const inputPath = path.resolve(__dirname,"./files/form1.pdf");
   const outputPath = path.resolve(__dirname,"./files/form1new.pdf");

   const replaceText = async()=>{
     const pdfdoc = await PDFNet.PDFDoc.createFromFilePath(inputPath);
     await pdfdoc.initSecurityHandler();
     const replacer = await PDFNet.ContentReplacer.create()
     const page= await pdfdoc.getPage(1);
     

     const name="\u2713"
     await replacer.addString('lname',name);
     await replacer.addString('fname','Aamna');

     await replacer.process(page);
     return pdfdoc.save(outputPath,PDFNet.SDFDoc.SaveOptions.e_linearized);
   }

   
   PDFNet.runWithCleanup(replaceText).then(()=>{
    fs.readFile((outputPath,[err,data])=>{
   if (err){
     res.statusCode=500;
     res.end(err)
   }
   else{
     res.setHeader('ContentType','application/pdf')
     res.end(data)
   }
      
    }).catch(err=>{
      res.statusCode=400;
      res.end(err)
    })
  })
 }
  
  
   

 ) 



module.exports = route;