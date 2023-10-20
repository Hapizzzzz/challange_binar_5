const { createBankAccount, getBankAccountById, editBankAccount, deleteBankAccount } = require('../../libs/bankAccount.libs');

describe('Unit Tests for Bank Account CRUD Functions', () => {
    let bankAccount;

    beforeAll(async () => {
        await prisma.bankAccount.deleteMany();
    });

    test('Create a new bank account -> Success', async () => {
        const userId = 1; // Gantilah dengan ID pengguna yang valid
        const bankName = 'Bank ABC';
        const bankAccountNumber = '1234567890';
        const balance = 1000.00;

        bankAccount = await createBankAccount(userId, bankName, bankAccountNumber, balance);

        expect(bankAccount).toHaveProperty('id');
        expect(bankAccount).toHaveProperty('userId', userId);
        expect(bankAccount).toHaveProperty('bankName', bankName);
        expect(bankAccount).toHaveProperty('bankAccountNumber', bankAccountNumber);
        expect(bankAccount).toHaveProperty('balance', balance);
    });

    test('Get bank account by ID -> Success', async () => {
        if (bankAccount) {
            const foundBankAccount = await getBankAccountById(bankAccount.id);

            expect(foundBankAccount).toHaveProperty('id', bankAccount.id);
            expect(foundBankAccount).toHaveProperty('userId', bankAccount.userId);
            expect(foundBankAccount).toHaveProperty('bankName', bankAccount.bankName);
            expect(foundBankAccount).toHaveProperty('bankAccountNumber', bankAccount.bankAccountNumber);
            expect(foundBankAccount).toHaveProperty('balance', bankAccount.balance);
        } else {
            // Jika tidak ada bank account yang berhasil dibuat sebelumnya
            expect(true).toBe(false);
        }
    });

    test('Edit bank account by ID -> Success', async () => {
        if (bankAccount) {
            const updatedBankName = 'Updated Bank';
            const updatedBankAccountNumber = '9876543210';
            const updatedBalance = 2000.00;

            const updatedBankAccount = await editBankAccount(bankAccount.id, updatedBankName, updatedBankAccountNumber, updatedBalance);

            expect(updatedBankAccount).toHaveProperty('id', bankAccount.id);
            expect(updatedBankAccount).toHaveProperty('userId', bankAccount.userId);
            expect(updatedBankAccount).toHaveProperty('bankName', updatedBankName);
            expect(updatedBankAccount).toHaveProperty('bankAccountNumber', updatedBankAccountNumber);
            expect(updatedBankAccount).toHaveProperty('balance', updatedBalance);
        } else {
            // Jika tidak ada bank account yang berhasil dibuat sebelumnya
            expect(true).toBe(false);
        }
    });

    test('Delete bank account by ID -> Success', async () => {
        if (bankAccount) {
            const deletedBankAccount = await deleteBankAccount(bankAccount.id);
            expect(deletedBankAccount).toHaveProperty('id', bankAccount.id);
        } else {
            // Jika tidak ada bank account yang berhasil dibuat sebelumnya
            expect(true).toBe(false);
        }
    });

    test('Get bank account by non-existing ID -> Error', async () => {
        const nonExistingBankAccountId = 99999; // Pastikan ID ini tidak ada
        try {
            const foundBankAccount = await getBankAccountById(nonExistingBankAccountId);
        } catch (error) {
            expect(error.message).toBe('Bank Account not found');
        }
    });

    test('Edit bank account with non-existing ID -> Error', async () => {
        const nonExistingBankAccountId = 99999; // Pastikan ID ini tidak ada
        try {
            const updatedBankAccount = await editBankAccount(nonExistingBankAccountId, 'Updated Bank', '9876543210', 2000.00);
        } catch (error) {
            expect(error.message).toBe('Bank Account not found');
        }
    });

    test('Delete bank account with non-existing ID -> Error', async () => {
        const nonExistingBankAccountId = 99999; // Pastikan ID ini tidak ada
        try {
            const deletedBankAccount = await deleteBankAccount(nonExistingBankAccountId);
        } catch (error) {
            expect(error.message).toBe('Bank Account not found');
        }
    });
});
