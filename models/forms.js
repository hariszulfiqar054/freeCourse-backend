const mongoose = require("mongoose");

const form = mongoose.Schema({
  _id: new mongoose.Schema.Types.ObjectId(),
  appliedCourse: { type: String, required: true },
  highestQualificationLevel: { type: String, required: true },
  age19orOlder: {type: String, required: true},
  residencyStatus:{type: String, required: true},
  livingStatus:{type: String, required: true},
  proof: {type: String, required: true},
  title:{type: String, required: true},
  firstName:{type:String, required: true},
  lastName:{type:String, required: true},
  gender:{type:String, required: true},
  dob:{type: Date, required: true},
  addLine1:{type: String, required: true},
  age:{type:String, required: true},
  city:{type:String, required: true},
  county:{type:String, required: true},
  postcode:{type:String, required: true},
  yearsAtAdd:{type: String, required: true},
  telephone:{type: String, required: true},
  mobile:{type: String, required: true},
  email: {type: String, required: true},
  emergencyContactName: {type: String, requird: true},
  emergencyTelephone:{type: String, required: true},
  nationality:{type: String, required: true},
  nationalInsNo:{type: String, required: true},
  employmentStatus:{type:String, required: true},
  hoursPerWeek:{type:String},
  employmentLength:{type:String},
  employerName:{type:String},
  employerAddress:{type:String},
  employerPostcode:{type:String},
  employersTelNo:{type:String},
  unemployedLength:{type:String},
  benefits:{type:String},
  areYou:{type:String},
  ethnicOrigin:{type:String},
  firstLang:{type:String},
  residentOfEngland:{type:String},
  nonEEACitizen:{type:String},
  householdSituation:[{type:String}],
  criminalConvictions:{type:String, required: true},
  qualification:{type:String},
  mathsGrades:{type:String},
  englishGrades:{type:String},
  contactPref:{type:String},
  contactMethodPref:[{type:String}],
  marketingMethodPref:[{type:String}],
  date: {type:String},
  collegeName:{type:String},
  wheelchair:{type:String},
  disabilities:{type:String},
  disabilitiesValues:[{type:String}],
 
  
});

module.exports = mongoose.model("Form", form);