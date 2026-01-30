const { cartModel, productModel } = require('../models');

function addItem(userId, productId, quantity) {
  const product = productModel.findById(productId);
  if (!product) return { error: 'Product not found' };
  const qty = Math.max(1, parseInt(quantity, 10) || 1);
  cartModel.add(userId, productId, qty);
  return { success: true };
}

function getCart(userId) {
  return cartModel.getByUserId(userId);
}

module.exports = { addItem, getCart };
