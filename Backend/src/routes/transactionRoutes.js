import {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import express from "express";

const router = express.Router();

router.post("/", createTransaction);
router.get("/", getTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
