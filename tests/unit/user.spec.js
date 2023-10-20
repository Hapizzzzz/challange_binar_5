const { createUser, getUserById, editUser, deleteUser } = require('../../libs/users.libs');

describe('Unit Tests for User CRUD Functions', () => {
    let user;

    beforeAll(async () => {
        await prisma.user.deleteMany();
    });

    test('Create a new user -> Success', async () => {
        const name = 'usertest1';
        const email = 'usertest1@mail.com';
        const password = 'password123';

        user = await createUser(name, email, password);

        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name', name);
        expect(user).toHaveProperty('email', email);
        expect(user).toHaveProperty('password', password);
    });

    test('Create a user with existing email -> Error', async () => {
        const name = 'usertest2';
        const email = 'usertest1@mail.com'; // Gunakan email yang sudah ada
        const password = 'password123';

        try {
            user = await createUser(name, email, password);
        } catch (error) {
            expect(error.message).toBe('Email already in use');
        }
    });

    test('Get user by ID -> Success', async () => {
        if (user) {
            const foundUser = await getUserById(user.id);

            expect(foundUser).toHaveProperty('id', user.id);
            expect(foundUser).toHaveProperty('name', user.name);
            expect(foundUser).toHaveProperty('email', user.email);
            expect(foundUser).toHaveProperty('password', user.password);
        } else {
            // Jika tidak ada user yang berhasil dibuat sebelumnya
            expect(true).toBe(false);
        }
    });

    test('Get user by non-existing ID -> Error', async () => {
        const nonExistingUserID = 99999; // Pastikan ID ini tidak ada
        try {
            const foundUser = await getUserById(nonExistingUserID);
        } catch (error) {
            expect(error.message).toBe('User not found');
        }
    });

    test('Edit user by ID -> Success', async () => {
        if (user) {
            const updatedName = 'UpdatedName';
            const updatedEmail = 'updated@mail.com';
            const updatedPassword = 'newpassword123';

            const updatedUser = await editUser(user.id, updatedName, updatedEmail, updatedPassword);

            expect(updatedUser).toHaveProperty('id', user.id);
            expect(updatedUser).toHaveProperty('name', updatedName);
            expect(updatedUser).toHaveProperty('email', updatedEmail);
            expect(updatedUser).toHaveProperty('password', updatedPassword);
        } else {
            // Jika tidak ada user yang berhasil dibuat sebelumnya
            expect(true).toBe(false);
        }
    });

    test('Edit user with non-existing ID -> Error', async () => {
        const nonExistingUserID = 99999; // Pastikan ID ini tidak ada
        try {
            const updatedUser = await editUser(nonExistingUserID, 'UpdatedName', 'updated@mail.com', 'newpassword123');
        } catch (error) {
            expect(error.message).toBe('User not found');
        }
    });

    test('Delete user by ID -> Success', async () => {
        if (user) {
            const deletedUser = await deleteUser(user.id);
            expect(deletedUser).toHaveProperty('id', user.id);
        } else {
            // Jika tidak ada user yang berhasil dibuat sebelumnya
            expect(true).toBe(false);
        }
    });

    test('Delete user with non-existing ID -> Error', async () => {
        const nonExistingUserID = 99999; // Pastikan ID ini tidak ada
        try {
            const deletedUser = await deleteUser(nonExistingUserID);
        } catch (error) {
            expect(error.message).toBe('User not found');
        }
    });
});
