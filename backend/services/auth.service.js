const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userModel } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

function login(email, password) {
  const user = userModel.findByEmail(email);
  if (!user) return null;
  const match = bcrypt.compareSync(password, user.password_hash);
  if (!match) return null;
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  const { password_hash, ...safeUser } = user;
  return { token, user: safeUser };
}

function getMe(userId) {
  return userModel.findById(userId) || null;
}

module.exports = { login, getMe };
