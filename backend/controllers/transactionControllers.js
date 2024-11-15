const TransactionModel = require("../models/Transaction");
const paginate = require("../utils/paginate");

async function getTransactions(req, res) {
  try {
    const response = await paginate(TransactionModel, req.query);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions: " + error });
  }
}

async function createTransaction(req, res) {
  try {
    const { name, price, description, date } = req.body;

    await TransactionModel.create({
      name,
      price,
      description,
      date,
    });

    const response = await paginate(TransactionModel, req.query);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction: " + error });
  }
}

async function updateTransaction(req, res) {
  try {
    const { id, name, price, description, date } = req.body;

    await TransactionModel.updateOne(
      { _id: id },
      { $set: { name, price, description, date } }
    );

    const response = await paginate(TransactionModel, req.query);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction: " + error });
  }
}

async function deleteTransaction(req, res) {
  try {
    const { id } = req.body;

    await TransactionModel.deleteOne({ _id: id });

    const response = await paginate(TransactionModel, req.query);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction: " + error });
  }
}

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
