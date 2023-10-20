const app = require('../../app');
const request = require('supertest');
let createdBankAccount = {};

describe('Integration Test: CRUD for Bank Accounts', () => {
    test('Create a new bank account -> Success', async () => {
        try {
            const newBankAccount = {
                user_id: 1, // Ganti dengan ID pengguna yang valid
                bank_name: 'Test Bank',
                bank_account_number: '1234567890',
                balance: 1000.0,
            };

            const { statusCode, body } = await request(app)
                .post('/api/v1/accounts')
                .send(newBankAccount);

            expect(statusCode).toBe(201);
            expect(body).toHaveProperty('success', true);
            expect(body).toHaveProperty('message', 'Created');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('user_id');
            expect(body.data).toHaveProperty('bank_name');
            expect(body.data).toHaveProperty('bank_account_number');
            expect(body.data).toHaveProperty('balance');
            expect(body.data.user_id).toBe(newBankAccount.user_id);
            expect(body.data.bank_name).toBe(newBankAccount.bank_name);
            expect(body.data.bank_account_number).toBe(newBankAccount.bank_account_number);
            expect(body.data.balance).toBe(newBankAccount.balance);

            createdBankAccount = body.data;
        } catch (err) {
            throw err;
        }
    });

    test('Read all bank accounts -> Success', async () => {
        try {
            const { statusCode, body } = await request(app)
                .get('/api/v1/accounts');

            expect(statusCode).toBe(200);
            expect(Array.isArray(body.data)).toBe(true);
        } catch (err) {
            throw err;
        }
    });

    test('Read bank account by ID -> Success', async () => {
        try {
            const { statusCode, body } = await request(app)
                .get(`/api/v1/accounts/${createdBankAccount.id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('success', true);
            expect(body).toHaveProperty('message', 'OK');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('user_id');
            expect(body.data).toHaveProperty('bank_name');
            expect(body.data).toHaveProperty('bank_account_number');
            expect(body.data).toHaveProperty('balance');
            expect(body.data.id).toBe(createdBankAccount.id);
        } catch (err) {
            throw err;
        }
    });

    test('Update bank account by ID -> Success', async () => {
        try {
            const updatedData = {
                bank_name: 'Updated Bank',
                bank_account_number: '9876543210',
                balance: 2000.0,
            };

            const { statusCode, body } = await request(app)
                .put(`/api/v1/accounts/${createdBankAccount.id}`)
                .send(updatedData);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('success', true);
            expect(body).toHaveProperty('message', 'Updated');
            expect(body).toHaveProperty('data');
            expect(body.data.bank_name).toBe(updatedData.bank_name);
            expect(body.data.bank_account_number).toBe(updatedData.bank_account_number);
            expect(body.data.balance).toBe(updatedData.balance);
        } catch (err) {
            throw err;
        }
    });

    test('Delete bank account by ID -> Success', async () => {
        try {
            const { statusCode, body } = await request(app)
                .delete(`/api/v1/accounts/${createdBankAccount.id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('success', true);
            expect(body).toHaveProperty('message', 'Deleted');
        } catch (err) {
            throw err;
        }
    });
});
