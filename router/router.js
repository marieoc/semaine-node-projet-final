import express from "express";
import homeController from "../controllers/homeController.js";
import contactController from "../controllers/contactController.js";

const router = express.Router();

router.get('/', homeController.index);

router.get('/contact/:id', contactController.index);

router.get('/add-contact', contactController.create);
router.post('/add-contact', contactController.store);

export default router;