import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: { type: String },
    quantity: { type: Number },
});

const orderSchema = new mongoose.Schema({
    customerEmail: { type: String },
    items: [{ type: itemSchema }],
    address:{ type :String },
    total: { type: Number },
    status: { type: String }
});

export default mongoose.model('Order', orderSchema);
