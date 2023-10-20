const prisma = require ('../helper/prisma');

// Create a new bank account
const createBankAccount = async (req, res, next) => {
  try {
    const {user_id, bank_name, bank_account_number, balance} = req.body;
    const bankAccount = await prisma.bank_accounts.create ({
      data: {
        user_id,
        bank_name,
        bank_account_number,
        balance,
      },
    });
    res.status (201).json ({
      success: true,
      message: 'Bank account created',
      data: bankAccount,
    });
  } catch (error) {
    next (error);
  }
};

// Get a list of all bank accounts
const getAllBankAccounts = async (req, res, next) => {
  try {
    const bankAccounts = await prisma.bank_accounts.findMany ();
    res.status (200).json ({
      success: true,
      message: 'List of bank accounts',
      data: bankAccounts,
    });
  } catch (error) {
    next (error);
  }
};

// Get details of a specific bank account by ID
const getBankAccountDetails = async (req, res, next) => {
  try {
    const {accountID} = req.params;
    const bankAccount = await prisma.bank_accounts.findUnique ({
      where: {
        id: Number (accountID),
      },
    });
    if (!bankAccount) {
      return res
        .status (404)
        .json ({success: false, message: 'Bank account not found', data: null});
    }
    res.status (200).json ({
      success: true,
      message: 'Bank account details',
      data: bankAccount,
    });
  } catch (error) {
    next (error);
  }
};

// Update a specific bank account by ID
const updateBankAccount = async (req, res, next) => {
  try {
    const {accountID} = req.params;
    const {bank_name, bank_account_number, balance} = req.body;
    const updatedBankAccount = await prisma.bank_accounts.update ({
      where: {
        id: Number (accountID),
      },
      data: {
        bank_name,
        bank_account_number,
        balance,
      },
    });
    res.status (200).json ({
      success: true,
      message: 'Bank account updated',
      data: updatedBankAccount,
    });
  } catch (error) {
    next (error);
  }
};

// Delete a specific bank account by ID
const deleteBankAccount = async (req, res, next) => {
  try {
    const {accountID} = req.params;
    await prisma.bank_accounts.delete ({
      where: {
        id: Number (accountID),
      },
    });
    res
      .status (200)
      .json ({success: true, message: 'Bank account deleted', data: null});
  } catch (error) {
    next (error);
  }
};

module.exports = {
  createBankAccount,
  getAllBankAccounts,
  getBankAccountDetails,
  updateBankAccount,
  deleteBankAccount,
};
