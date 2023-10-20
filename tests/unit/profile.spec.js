const { createProfile, getProfileById, editProfile, deleteProfile } = require('../../libs/profile.libs');

describe('Unit Tests for Profile CRUD Functions', () => {
    let profile;

    beforeAll(async () => {
        await prisma.profile.deleteMany();
    });

    test('Create a new profile -> Success', async () => {
        const userId = 1; // Gantilah dengan ID pengguna yang valid
        const identityType = 'ID Card';
        const identityNumber = '1234567890';
        const address = '123 Main Street';

        profile = await createProfile(userId, identityType, identityNumber, address);

        expect(profile).toHaveProperty('id');
        expect(profile).toHaveProperty('userId', userId);
        expect(profile).toHaveProperty('identityType', identityType);
        expect(profile).toHaveProperty('identityNumber', identityNumber);
        expect(profile).toHaveProperty('address', address);
    });

    test('Get profile by ID -> Success', async () => {
        if (profile) {
            const foundProfile = await getProfileById(profile.id);

            expect(foundProfile).toHaveProperty('id', profile.id);
            expect(foundProfile).toHaveProperty('userId', profile.userId);
            expect(foundProfile).toHaveProperty('identityType', profile.identityType);
            expect(foundProfile).toHaveProperty('identityNumber', profile.identityNumber);
            expect(foundProfile).toHaveProperty('address', profile.address);
        } else {
            // Jika tidak ada profile yang berhasil dibuat sebelumnya
            expect(true).toBe(false);
        }
    });

    test('Edit profile by ID -> Success', async () => {
        if (profile) {
            const updatedIdentityType = 'Passport';
            const updatedIdentityNumber = '9876543210';
            const updatedAddress = '456 Elm Street';

            const updatedProfile = await editProfile(profile.id, updatedIdentityType, updatedIdentityNumber, updatedAddress);

            expect(updatedProfile).toHaveProperty('id', profile.id);
            expect(updatedProfile).toHaveProperty('userId', profile.userId);
            expect(updatedProfile).toHaveProperty('identityType', updatedIdentityType);
            expect(updatedProfile).toHaveProperty('identityNumber', updatedIdentityNumber);
            expect(updatedProfile).toHaveProperty('address', updatedAddress);
        } else {
            // Jika tidak ada profile yang berhasil dibuat sebelumnya
            expect(true).toBe(false);
        }
    });

    test('Delete profile by ID -> Success', async () => {
        if (profile) {
            const deletedProfile = await deleteProfile(profile.id);
            expect(deletedProfile).toHaveProperty('id', profile.id);
        } else {
            // Jika tidak ada profile yang berhasil dibuat sebelumnya
            expect(true).toBe(false);
        }
    });

    test('Get profile by non-existing ID -> Error', async () => {
        const nonExistingProfileId = 99999; // Pastikan ID ini tidak ada
        try {
            const foundProfile = await getProfileById(nonExistingProfileId);
        } catch (error) {
            expect(error.message).toBe('Profile not found');
        }
    });

    test('Edit profile with non-existing ID -> Error', async () => {
        const nonExistingProfileId = 99999; // Pastikan ID ini tidak ada
        try {
            const updatedProfile = await editProfile(nonExistingProfileId, 'Passport', '9876543210', '456 Elm Street');
        } catch (error) {
            expect(error.message).toBe('Profile not found');
        }
    });

    test('Delete profile with non-existing ID -> Error', async () => {
        const nonExistingProfileId = 99999; // Pastikan ID ini tidak ada
        try {
            const deletedProfile = await deleteProfile(nonExistingProfileId);
        } catch (error) {
            expect(error.message).toBe('Profile not found');
        }
    });
});
