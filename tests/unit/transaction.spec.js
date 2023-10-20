const { createTransaction, getTransactionById, editTransaction, deleteTransaction } = require('../../libs/transaction.libs');

describe('Unit Tests for Transaction CRUD Functions', () => {
    let transaction;

    beforeAll(async () => {
        await prisma.transaction.deleteMany();
    });

    test('Create a new transaction -> Success', async () => {
        const sourceAccountId = 1; // Gantilah dengan ID akun sumber yang valid
        const destinationAccountId = 2; // Gantilah dengan ID akun tujuan yang valid
        const amount = 100.00;

        transaction = await createTransaction(sourceAccountId, destinationAccountId, amount);

        expect(transaction).toHaveProperty('id');
        expect(transaction).toHaveProperty('sourceAccountId', sourceAccountId);
        expect(transaction).toHaveProperty('destinationAccountId', destinationAccountId);
        expect(transaction).toHaveProperty('amount', amount);
    });

    test('Get transaction by ID -> Success', async () => {
        if (transaction) {
            const foundTransaction = await getTransactionById(transaction.id);

            expect(foundTransaction).toHaveProperty('id', transaction.id);
            expect(foundTransaction).toHaveProperty('sourceAccountId', transaction.sourceAccountId);
            expect(foundTransaction).toHaveProperty('destinationAccountId', transaction.destinationAccountId);
            expect(foundTransaction).toHaveProperty('amount', transaction.amount);
        } else {
            // Jika tidak ada transaksi yang berhasil dibuat sebelumnya
            expect(true).toBe(false);
        }
    });

    test('Edit transaction by ID -> Success', async () => {
        if (transaction) {
            const updatedAmount = 200.00;

            const updatedTransaction = await editTransaction(transaction.id, updatedAmount);

            expect(updatedTransaction).toHaveProperty('id', transaction.id);
            expect(updatedTransaction).toHaveProperty('sourceAccountId', transaction.sourceAccountId);
            expect(updatedTransaction).toHaveProperty('destinationAccountId', transaction.destinationAccountId);
            expect(updatedTransaction).toHaveProperty('amount', updatedAmount);
        } else {
            // Jika tidak ada transaksi yang berhasil dibuat sebelumnya
            expect(true).toBe(false);
        }
    });

    test('Delete transaction by ID -> Success', async () => {
        if (transaction) {
            const deletedTransaction = await deleteTransaction(transaction.id);
            expect(deletedTransaction).toHaveProperty('id', transaction.id);
        } else {
            // Jika tidak ada transaksi yang berhasil dibuat sebelumnya
            expect(true).toBe(false);
        }
    });

    test('Get transaction by non-existing ID -> Error', async () => {
        const nonExistingTransactionId = 99999; // Pastikan ID ini tidak ada
        try {
            const foundTransaction = await getTransactionById(nonExistingTransactionId);
        } catch (error) {
            expect(error.message).toBe('Transaction not found');
        }
    });

    test('Edit transaction with non-existing ID -> Error', async () => {
        const nonExistingTransactionId = 99999; // Pastikan ID ini tidak ada
        try {
            const updatedTransaction = await editTransaction(nonExistingTransactionId, 200.00);
        } catch (error) {
            expect(error.message).toBe('Transaction not found');
        }
    });

    test('Delete transaction with non-existing ID -> Error', async () => {
        const nonExistingTransactionId = 99999; // Pastikan ID ini tidak ada
        try {
            const deletedTransaction = await deleteTransaction(nonExistingTransactionId);
        } catch (error) {
            expect(error.message).toBe('Transaction not found');
        }
    });
});
