const express = require('express');
const router = express.Router();
const bankAccountHandler = require('../controller/bankAccount.controller');

router.post('/', bankAccountHandler.createBankAccount);
router.get('/', bankAccountHandler.getAllBankAccounts);
router.get('/:accountID', bankAccountHandler.getBankAccountDetails);
router.put('/:accountID', bankAccountHandler.updateBankAccount);
router.delete('/:accountID', bankAccountHandler.deleteBankAccount);

module.exports = router;
