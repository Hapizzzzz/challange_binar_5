const prisma = require ('../helper/prisma');
const createUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      identity_type,
      identity_number,
      address,
    } = req.body;
    const user = await prisma.users.create ({
      data: {
        name,
        email,
        password,
        profile: {
          create: {identity_type, identity_number, address},
        },
      },
    });
    res.status (201).json ({success: true, message: 'Created', data: user});
  } catch (error) {
    next (error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.users.findMany ({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
    res.status (200).json ({success: true, message: 'OK', data: users});
  } catch (error) {
    next (error);
  }
};

const getDetailUser = async (req, res, next) => {
  try {
    const {userID} = req.params;
    const user = await prisma.users.findUnique ({
      where: {
        id: Number (userID),
      },
      include: {profile: true},
    });
    if (!user)
      return res
        .status (404)
        .json ({success: false, message: 'Not Found', data: null});
    res.status (200).json ({success: true, message: 'OK', data: user});
  } catch (error) {
    next (error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const {userID} = req.params;
    const {
      name,
      email,
      password,
      identity_type,
      identity_number,
      address,
    } = req.body;

    const user = await prisma.users.update ({
      where: {
        id: Number (userID),
      },
      data: {
        name,
        email,
        password,
        profile: {
          update: {
            identity_type,
            identity_number,
            address,
          },
        },
      },
    });

    if (!user)
      return res
        .status (404)
        .json ({success: false, message: 'User not found', data: null});

    res
      .status (200)
      .json ({success: true, message: 'User updated successfully', data: user});
  } catch (error) {
    next (error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const {userID} = req.params;

    const user = await prisma.users.delete ({
      where: {
        id: Number (userID),
      },
    });

    if (!user)
      return res
        .status (404)
        .json ({success: false, message: 'User not found', data: null});

    res
      .status (200)
      .json ({success: true, message: 'User deleted successfully', data: user});
  } catch (error) {
    next (error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getDetailUser,
  editUser,
  deleteUser,
};
