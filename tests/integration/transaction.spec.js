const app = require('../../app');
const request = require('supertest');
let createdTransaction = {};

describe('Integration Test: CRUD for Transactions', () => {
    test('Create a new transaction -> Success', async () => {
        try {
            const newTransaction = {
                source_account_id: 1, // Ganti dengan ID akun sumber yang valid
                destination_account_id: 2, // Ganti dengan ID akun tujuan yang valid
                amount: 100.0,
            };

            const { statusCode, body } = await request(app)
                .post('/api/v1/transactions')
                .send(newTransaction);

            expect(statusCode).toBe(201);
            expect(body).toHaveProperty('success', true);
            expect(body).toHaveProperty('message', 'Created');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('source_account_id');
            expect(body.data).toHaveProperty('destination_account_id');
            expect(body.data).toHaveProperty('amount');
            expect(body.data.source_account_id).toBe(newTransaction.source_account_id);
            expect(body.data.destination_account_id).toBe(newTransaction.destination_account_id);
            expect(body.data.amount).toBe(newTransaction.amount);

            createdTransaction = body.data;
        } catch (err) {
            throw err;
        }
    });

    test('Read all transactions -> Success', async () => {
        try {
            const { statusCode, body } = await request(app)
                .get('/api/v1/transactions');

            expect(statusCode).toBe(200);
            expect(Array.isArray(body.data)).toBe(true);
        } catch (err) {
            throw err;
        }
    });

    test('Read transaction by ID -> Success', async () => {
        try {
            const { statusCode, body } = await request(app)
                .get(`/api/v1/transactions/${createdTransaction.id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('success', true);
            expect(body).toHaveProperty('message', 'OK');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('source_account_id');
            expect(body.data).toHaveProperty('destination_account_id');
            expect(body.data).toHaveProperty('amount');
            expect(body.data.id).toBe(createdTransaction.id);
        } catch (err) {
            throw err;
        }
    });

    test('Update transaction by ID -> Success', async () => {
        try {
            const updatedData = {
                source_account_id: 2, // Ganti dengan ID akun sumber yang valid
                destination_account_id: 1, // Ganti dengan ID akun tujuan yang valid
                amount: 200.0,
            };

            const { statusCode, body } = await request(app)
                .put(`/api/v1/transactions/${createdTransaction.id}`)
                .send(updatedData);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('success', true);
            expect(body).toHaveProperty('message', 'Updated');
            expect(body).toHaveProperty('data');
            expect(body.data.source_account_id).toBe(updatedData.source_account_id);
            expect(body.data.destination_account_id).toBe(updatedData.destination_account_id);
            expect(body.data.amount).toBe(updatedData.amount);
        } catch (err) {
            throw err;
        }
    });

    test('Delete transaction by ID -> Success', async () => {
        try {
            const { statusCode, body } = await request(app)
                .delete(`/api/v1/transactions/${createdTransaction.id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('success', true);
            expect(body).toHaveProperty('message', 'Deleted');
        } catch (err) {
            throw err;
        }
    });
});
