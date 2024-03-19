import mongoose from "mongoose";

let customerSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String },
    password: { type: String },
    address: { type: String },
    phones: [{ type: String }],
}) 
const customerModel = mongoose.model('Customer', customerSchema)
export default customerModel ;