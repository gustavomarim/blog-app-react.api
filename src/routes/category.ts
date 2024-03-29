import { Router } from "express";
import CategoryController from "../controllers/CategoryController";
const router = Router();

const categoryController = CategoryController;

// All Categories
router.get("/categories", categoryController.readAllCategories);

// All Categories by Slug
router.get("/categories/:slug", categoryController.readPostsByCategory);

// Category by id
router.get("/category/:slug", categoryController.readCategoryBySlug);

export default router;
