import mongoose from "mongoose";
let prescriptionSchema = new mongoose.Schema({
   customerName:{type : String},
   message: {type : String}
}) 
const prescriptionModel = mongoose.model('Prescription', prescriptionSchema)
export default prescriptionModel ;