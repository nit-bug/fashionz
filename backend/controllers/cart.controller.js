const cartService = require('../services/cart.service');

function addItem(req, res) {
  const { productId, quantity } = req.body || {};
  if (!productId) return res.status(400).json({ error: 'productId required' });
  const result = cartService.addItem(req.user.id, productId, quantity);
  if (result.error) return res.status(400).json({ error: result.error });
  res.json(result);
}

function getCart(req, res) {
  const items = cartService.getCart(req.user.id);
  res.json(items);
}

module.exports = { addItem, getCart };
