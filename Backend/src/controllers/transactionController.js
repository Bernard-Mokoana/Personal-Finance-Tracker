import { transaction } from "../model/transaction.js";

export const createTransaction = async (req, res) => {
  const { type, category, amount, description, date } = req.body;
  const userId = req?.user?._id;

  if (!type || !category || !amount)
    return res.status(400).json({ message: "Missing Fields" });

  try {
    const Transaction = await transaction.create({
      user: userId,
      type,
      category,
      amount,
      description,
      date,
    });

    return res.status(201).json({
      message: "Transaction created successfully",
      transaction: Transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create a transaction",
      error: error.message,
    });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const Transaction = await transaction.find({ user: req.user._id }).sort({
      date: -1,
    });

    res.status(200).json({
      message: "Transaction is fetched successfully",
      transaction: Transaction,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching transaction", error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const Transaction = await transaction.findOneAndUpdate(
      {
        _id: id,
        user: req.user._id,
      },
      req.body,
      { new: true }
    );

    if (!Transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Updated successfully" }, Transaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to update", error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const Transaction = await transaction.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!Transaction)
      return res.status(400).json({ message: "Transaction not found" });

    res
      .status(200)
      .json({ message: "Deleted successfully", transaction: Transaction });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete", error: error.message });
  }
};
