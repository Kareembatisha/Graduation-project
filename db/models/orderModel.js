import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemID: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    items: [{ type: itemSchema }],
    total: { type: Number },
    status: { type: String }
});

export default mongoose.model('Order', orderSchema);
