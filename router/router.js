import express from "express";
import homeController from "../controllers/homeController.js";
import contactController from "../controllers/contactController.js";

const router = express.Router();

router.get('/', homeController.index);

router.get('/contact/:id', contactController.index);

export default router;