import {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import express from "express";
import { verifyJwt } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyJwt);

router.post("/", createTransaction);
router.get("/", getTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
