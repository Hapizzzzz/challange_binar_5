const prisma = require('../helper/prisma');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
  try {
    const { name, email, password, identity_type, identity_number, address } = req.body;

    if (!name || !email || !password || !identity_type || !identity_number || !address) {
      return res.status(400).json({ success: false, message: 'Missing required fields', data: null });
    }

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        profile: {
          create: {
            identity_type,
            identity_number,
            address,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        profile: {
          select: {
            identity_type: true,
            identity_number: true,
            address: true,
          },
        },
      },
    });

    res.status(201).json({ success: true, message: 'User created successfully', data: user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Missing email or password', data: null });
    }

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
      include: {
        profile: true,
      },
    });

    if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials', data: null });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(400).json({ success: false, message: 'Invalid credentials', data: null });
    delete user.password;
    const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ success: true, message: 'User logged in successfully', data: { accessToken } });
  } catch (error) {
    next(error);
  }
};

const authenticate = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user) return res.status(401).json({ success: false, message: 'Unauthorized', data: null });

    res.status(200).json({ success: true, message: 'User authenticated successfully', data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, authenticate };
