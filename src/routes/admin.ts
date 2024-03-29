// ./routes/admin.ts
import { Router } from "express";
import CategoryController from "../controllers/CategoryController";
import PostController from "../controllers/PostController";
import { isAdmin } from "../helpers/isAdmin";

const router = Router();
const categoryController = CategoryController;
const postController = PostController;

// Rota Category
router.get("/admin/categories", isAdmin, categoryController.readAllCategories);
router.post("/admin/categories", isAdmin, categoryController.createCategory);
router.get(
  "/admin/categories/:id",
  isAdmin,
  categoryController.readCategoryById
);
router.put("/admin/categories/:id", isAdmin, categoryController.updateCategory);
router.delete(
  "/admin/categories/:id",
  isAdmin,
  categoryController.deleteCategory
);

// Rota Post
router.get("/admin/posts", isAdmin, postController.read);
router.get("/admin/posts/:id", isAdmin, postController.getPostById);
router.post("/admin/posts", isAdmin, postController.create);
router.put("/admin/posts/:id", isAdmin, postController.update);
router.delete("/admin/posts/:id", isAdmin, postController.delete);

export default router;
