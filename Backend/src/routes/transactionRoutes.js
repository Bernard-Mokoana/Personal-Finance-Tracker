import {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
} from "../controllers/transactionController.js";
import express from "express";
import { verifyJwt } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyJwt);

router.post("/", createTransaction);
router.get("/", getTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);
router.get("/summary", getSummary);

export default router;
