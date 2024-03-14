import express from 'express';
import { validation } from '../../validation/validation.js';
import { newPresriptionSchema } from './prescriptionValidation.js';
import prescriptionModel from '../../../db/models/prescriptionModel.js';
import customerModel from '../../../db/models/customerModel.js';

const prescriptionRoutes = express.Router();

prescriptionRoutes.post("/addPrescription/:id", validation(newPresriptionSchema), async (req, res) => {
    try {
     const customer = await customerModel.findById(req.params.id);
     if(!customer) {res.status(404).json({ message: "Customer not found" });}
     const customerName = customer.name
     const newPresription = await prescriptionModel.create({
        customerName: customerName,
        message:req.body.message
     })
     res.status(200).json({ message: "Prescription added successfully", newPresription});
    } catch (error) {
        console.error("Error adding Prescription:", error);
        res.status(500).json({ message: "An error occurred while adding/updating the Prescription" });
    }
});

prescriptionRoutes.patch("/updatePrescription/:id", validation(updatePrescriptionSchema), async (req, res) => {
    try {
        const found = await prescriptionModel.findByIdAndUpdate(req.params.id,{
            message: req.body.message
        })
        if (found) {
            res.status(200).json({ message: "Prescription updated successfully", found });
        } else {
            res.status(404).json({ message: "Prescription not found" });
        }
    } catch (error) {
        console.error("Error updating Prescription:", error);
        res.status(500).json({ message: "An error occurred while updating the Prescription" });
    }
});

prescriptionRoutes.delete("/deletePrescription/:id", async (req, res) => {
    try {
        
        const found = await prescriptionModel.findByIdAndDelete( req.params.id );

        if (found) {
            res.status(200).json({ message: "Prescription deleted successfully", found });
        } else {
            res.status(404).json({ message: "Prescription not found" });
        }
    } catch (error) {
        console.error("Error deleting Prescription:", error);
        res.status(500).json({ message: "An error occurred while deleting the Prescription" });
    }
});

prescriptionRoutes.get("/getAllPrescriptions", async (req, res) => {
    try {
        const allPrescriptions = await prescriptionModel.find();

        if (allPrescriptions.length > 0) {
            res.status(200).json({ message: "Prescriptions found", allPrescriptions });
        } else {
            res.status(404).json({ message: "No Prescriptions found" });
        }
    } catch (error) {
        console.error("Error fetching Prescriptions:", error);
        res.status(500).json({ message: "An error occurred while fetching Prescriptions" });
    }
});

prescriptionRoutes.get("/getPrescriptionById/:id", async (req, res) => {
    try {
        const found = await prescriptionModel.findById(req.params.id);

        if (found) {
            res.status(200).json({ message: "Prescription found", found });
        } else {
            res.status(404).json({ message: "Prescription not found" });
        }
    } catch (error) {
        console.error("Error fetching Prescription:", error);
        res.status(500).json({ message: "An error occurred while fetching the Prescription" });
    }
});

export default prescriptionRoutes;
