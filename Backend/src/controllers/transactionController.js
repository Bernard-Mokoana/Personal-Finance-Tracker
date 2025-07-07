import { transaction } from "../model/transaction";

export const createTransaction = async (res, req) => {
  const { type, category, amount, description, date } = req.body;

  if (!type || !category || !amount)
    return res.status(400).json({ message: "Missing Fields" });

  try {
    const Transaction = await transaction.create({
      User: req.User._id,
      type,
      category,
      amount,
      description,
      date,
    });

    res
      .status(201)
      .json({ message: "Transaction created successfully" }, Transaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to create a transaction", error });
  }
};

export const getTransaction = async (res, req) => {
  try {
    const Transaction = await transaction.find({ user: req.user._id }).sort({
      date: -1,
    });

    res
      .status(200)
      .json({ message: "Transaction is fetched successfully" }, Transaction);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching transaction", error: error.message });
  }
};

export const updateTransaction = async (res, req) => {
  const { id } = req.params;

  try {
    const Transaction = await transaction.findOneAndUpdate(
      {
        id: _id,
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

export const deleteTransaction = async (res, req) => {
  const { id } = req.params;

  try {
    const Transaction = await transaction.findOneAndDelete({
      id: _id,
      user: req.user._id,
    });

    if (!Transaction)
      return res.status(400).json({ message: "Transaction not found" });

    res
      .status(200)
      .json({ message: "Deleted successfully", error: error.message });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete", error: error.message });
  }
};
