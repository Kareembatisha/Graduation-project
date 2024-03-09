import express from 'express';
import { validation } from '../../validation/validation.js';
import { newServiceSchema, updateServiceSchema } from './serviceValidation.js';
import serviceModel from '../../../db/models/serviceModel.js';

const serviceRoutes = express.Router();

serviceRoutes.post("/addService", validation(newServiceSchema), async (req, res) => {
    try {
        const { name, image, price } = req.body;
        const updatedService = await serviceModel.findOneAndUpdate(
            { name },
            { name, image, price },
            { upsert: true, new: true }
        );

        const message = updatedService._id ? "Service updated successfully" : "Service added successfully";
        res.status(200).json({ message, updatedService });
    } catch (error) {
        console.error("Error adding/updating service:", error);
        res.status(500).json({ message: "An error occurred while adding/updating the service" });
    }
});

serviceRoutes.patch("/updateService/:name", validation(updateServiceSchema), async (req, res) => {
    try {
        const search = req.params.name;
        const { name, image, price } = req.body;

        const updatedService = await serviceModel.findOneAndUpdate(
            { name:search },
            { name, image , price },
            { new: true }
        );

        if (updatedService) {
            res.status(200).json({ message: "Service updated successfully", updatedService });
        } else {
            res.status(404).json({ message: "Service not found" });
        }
    } catch (error) {
        console.error("Error updating Service:", error);
        res.status(500).json({ message: "An error occurred while updating the service" });
    }
});

serviceRoutes.delete("/deleteService/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const found = await serviceModel.findOneAndDelete({ name });

        if (found) {
            res.status(200).json({ message: "Service deleted successfully", found });
        } else {
            res.status(404).json({ message: "Service not found" });
        }
    } catch (error) {
        console.error("Error deleting Service:", error);
        res.status(500).json({ message: "An error occurred while deleting the service" });
    }
});

serviceRoutes.get("/getAllServices", async (req, res) => {
    try {
        const allServices = await serviceModel.find();

        if (allServices.length > 0) {
            res.status(200).json({ message: "Services found", allServices });
        } else {
            res.status(404).json({ message: "No services found" });
        }
    } catch (error) {
        console.error("Error fetching Services:", error);
        res.status(500).json({ message: "An error occurred while fetching services" });
    }
});

serviceRoutes.get("/getServiceByName/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const found = await serviceModel.findOne({ name });

        if (found) {
            res.status(200).json({ message: "Service found", found });
        } else {
            res.status(404).json({ message: "Service not found" });
        }
    } catch (error) {
        console.error("Error fetching Service:", error);
        res.status(500).json({ message: "An error occurred while fetching the service" });
    }
});

export default serviceRoutes;
