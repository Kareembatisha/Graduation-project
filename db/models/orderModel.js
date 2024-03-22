import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemID: { type: mongoose.Schema.Types.ObjectId , ref: 'Medicine'},
    quantity: { type: Number },
});

const orderSchema = new mongoose.Schema({
    customerEmail: { type: mongoose.Schema.Types.ObjectId },
    items: [{ type: itemSchema }],
    address:{ type :String },
    total: { type: Number },
    status: { type: String }
});

export default mongoose.model('Order', orderSchema);
