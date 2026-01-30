const orderService = require('../services/order.service');

function create(req, res) {
  const { items } = req.body || {};
  let result;
  if (items && Array.isArray(items) && items.length) {
    result = orderService.createFromItems(req.user.id, items);
  } else {
    result = orderService.createFromCart(req.user.id);
  }
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.status(201).json({ orderId: result.orderId, total: result.total });
}

module.exports = { create };
