import express from 'express';
import multer from 'multer';
import { validation } from '../../validation/validation.js';
import categoryModel from '../../../db/models/categoryModel.js';
import { newCategorySchema, updateCategorySchema } from './categoryValidation.js';

const categoryRoutes = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

categoryRoutes.post("/addCategory", upload.single('image'), validation(newCategorySchema), async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file.path;

        const updatedCategory = await categoryModel.findOneAndUpdate(
            { name },
            { name, image },
            { upsert: true, new: true }
        );

        const message = updatedCategory._id ? "Category updated successfully" : "Category added successfully";
        res.status(200).json({ message, updatedCategory });
    } catch (error) {
        console.error("Error adding/updating category:", error);
        res.status(500).json({ message: "An error occurred while adding/updating the category" });
    }
});

categoryRoutes.patch("/updateCategory/:name", validation(updateCategorySchema), async (req, res) => {
    try {
        const search = req.params.name;
        const { name, image } = req.body;

        const updatedCategory = await categoryModel.findOneAndUpdate(
            { name:search },
            { name, image },
            { new: true }
        );

        if (updatedCategory) {
            res.status(200).json({ message: "Category updated successfully", updatedCategory });
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "An error occurred while updating the category" });
    }
});

categoryRoutes.delete("/deleteCategory/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const found = await categoryModel.findOneAndDelete({ name });

        if (found) {
            res.status(200).json({ message: "Category deleted successfully", found });
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "An error occurred while deleting the category" });
    }
});

categoryRoutes.get("/getAllCategories", async (req, res) => {
    try {
        const allCategories = await categoryModel.find();

        if (allCategories.length > 0) {
            res.status(200).json({ message: "Categories found", allCategories });
        } else {
            res.status(404).json({ message: "No categories found" });
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "An error occurred while fetching categories" });
    }
});

categoryRoutes.get("/getCategoryByName/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const found = await categoryModel.findOne({ name });

        if (found) {
            res.status(200).json({ message: "Category found", found });
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ message: "An error occurred while fetching the category" });
    }
});

export default categoryRoutes;
