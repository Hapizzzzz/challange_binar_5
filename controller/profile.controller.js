const prisma = require('../helper/prisma');

// Create a new profile
const createProfile = async (user_id, identity_type, identity_number, address) => {
    const profile = await prisma.profiles.create({
        data: {
            user_id,
            identity_type,
            identity_number,
            address,
        },
    });
    return profile;
};

const getAllProfiles = async () => {
    const profiles = await prisma.profiles.findMany();
    return profiles;
};

// Get a profile by user_id
const getProfileByUserId = async (user_id) => {
    const profile = await prisma.profiles.findUnique({
        where: {
            user_id,
        },
    });
    return profile;
};

// Update an existing profile by user_id
const updateProfileByUserId = async (user_id, identity_type, identity_number, address) => {
    const updatedProfile = await prisma.profiles.update({
        where: {
            user_id,
        },
        data: {
            identity_type,
            identity_number,
            address,
        },
    });
    return updatedProfile;
};

// Delete a profile by user_id
const deleteProfileByUserId = async (user_id) => {
    await prisma.profiles.delete({
        where: {
            user_id,
        },
    });
};

module.exports = {
    createProfile,
    getAllProfiles,
    getProfileByUserId,
    updateProfileByUserId,
    deleteProfileByUserId,
};
