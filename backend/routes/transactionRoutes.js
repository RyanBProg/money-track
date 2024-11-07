const express = require("express");
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionControllers");

const router = express.Router();

router.get("/transactions", getTransactions);
router.post("/transactions", createTransaction);
router.put("/transactions", updateTransaction);
router.delete("/transactions", deleteTransaction);

module.exports = router;
