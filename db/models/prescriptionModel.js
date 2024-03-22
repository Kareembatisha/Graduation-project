import mongoose from "mongoose";
let prescriptionSchema = new mongoose.Schema({
   customerEmail:{type : String},
   message: {type : String},
   answer: {type : String},
   status: {type : String}
}) 
const prescriptionModel = mongoose.model('Prescription', prescriptionSchema)
export default prescriptionModel ;