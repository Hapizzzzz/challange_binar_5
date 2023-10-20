const prisma = require ('../helper/prisma');
const createTransaction = async (req, res, next) => {
  try {
    const {source_account_id, destination_account_id, amount} = req.body;
    const source_account = await prisma.bank_accounts.findUnique ({
      where: {id: source_account_id},
    });
    if (!source_account)
      return res
        .status (404)
        .json ({
          success: false,
          message: 'Source account Not Found',
          data: null,
        });

    const destination_account = await prisma.bank_accounts.findUnique ({
      where: {id: destination_account_id},
    });
    if (!destination_account)
      return res
        .status (404)
        .json ({
          success: false,
          message: 'Destination account Not Found',
          data: null,
        });

    if (source_account.balance < Number (amount))
      return res
        .status (400)
        .json ({success: false, message: 'Balance less', data: null});

    await prisma.bank_accounts.update ({
      where: {id: source_account_id},
      data: {balance: Number (source_account.balance) - Number (amount)},
    });

    await prisma.bank_accounts.update ({
      where: {id: destination_account_id},
      data: {balance: Number (destination_account.balance) + Number (amount)},
    });

    const transaction = await prisma.transaction.create ({
      data: {
        amount: Number (amount),
        source_account_id,
        destination_account_id,
      },
    });

    res
      .status (201)
      .json ({success: true, message: 'Created', data: transaction});
  } catch (error) {
    next (error);
  }
};

const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await prisma.transaction.findMany ();
    res.status (200).json ({success: true, message: 'OK', data: transactions});
  } catch (error) {
    next (error);
  }
};

const getDetailTransaction = async (req, res, next) => {
  try {
    const {transactionID} = req.params;
    const transaction = await prisma.transaction.findUnique ({
      where: {
        id: Number (transactionID),
      },
      include: {sourceAccount: true, destinationAccount: true},
    });
    if (!transaction)
      return res
        .status (404)
        .json ({success: false, message: 'Not Found', data: null});
    res.status (200).json ({success: true, message: 'OK', data: transaction});
  } catch (error) {
    next (error);
  }
};

const editTransaction = async (req, res, next) => {
  try {
    const {transactionID} = req.params;
    const {source_account_id, destination_account_id, amount} = req.body;

    const transaction = await prisma.transaction.update ({
      where: {
        id: Number (transactionID),
      },
      data: {
        amount: Number (amount),
        source_account_id,
        destination_account_id,
      },
    });

    if (!transaction)
      return res
        .status (404)
        .json ({success: false, message: 'Transaction not found', data: null});

    res
      .status (200)
      .json ({
        success: true,
        message: 'Transaction updated successfully',
        data: transaction,
      });
  } catch (error) {
    next (error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const {transactionID} = req.params;

    const transaction = await prisma.transaction.delete ({
      where: {
        id: Number (transactionID),
      },
    });

    if (!transaction)
      return res
        .status (404)
        .json ({success: false, message: 'Transaction not found', data: null});

    res
      .status (200)
      .json ({
        success: true,
        message: 'Transaction deleted successfully',
        data: transaction,
      });
  } catch (error) {
    next (error);
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getDetailTransaction,
  editTransaction,
  deleteTransaction,
};
