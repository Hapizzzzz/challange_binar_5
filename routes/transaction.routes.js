const express = require('express');
const router = express.Router();
const { createTransaction, getAllTransactions, getDetailTransaction, editTransaction, deleteTransaction } = require('../controller/transaction.controller');

router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.get('/:transactionID', getDetailTransaction);
router.put('/:transactionID', editTransaction);
router.delete('/:transactionID', deleteTransaction);

module.exports = router;
