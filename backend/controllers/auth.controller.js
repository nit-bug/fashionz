const authService = require('../services/auth.service');

function register(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  const result = authService.register(email, password);
  if (!result) return res.status(400).json({ error: 'Email already in use' });
  res.json(result);
}

function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  const result = authService.login(email, password);
  if (!result) return res.status(401).json({ error: 'Invalid email or password' });
  res.json(result);
}

function getMe(req, res) {
  const user = authService.getMe(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}

module.exports = { register, login, getMe };
