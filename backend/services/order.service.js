const { orderModel, cartModel, productModel } = require('../models');
const { db } = require('../db');

function createFromCart(userId) {
  const cartItems = cartModel.getByUserId(userId);
  if (!cartItems.length) return { error: 'Cart is empty' };
  let total = 0;
  for (const item of cartItems) {
    total += item.price * item.quantity;
  }
  const orderId = orderModel.create(userId, total);
  for (const item of cartItems) {
    orderModel.addItem(orderId, item.product_id, item.quantity, item.price);
  }
  cartModel.clear(userId);
  return { orderId, total };
}

function createFromItems(userId, items) {
  if (!items || !items.length) return { error: 'No items provided' };
  let total = 0;
  const stmt = db.prepare('SELECT id, price FROM products WHERE id = ?');
  for (const { productId, quantity } of items) {
    const p = stmt.get(productId);
    if (!p || quantity < 1) return { error: 'Invalid item' };
    total += p.price * quantity;
  }
  const orderId = orderModel.create(userId, total);
  const getPrice = db.prepare('SELECT price FROM products WHERE id = ?');
  for (const { productId, quantity } of items) {
    const { price } = getPrice.get(productId);
    orderModel.addItem(orderId, productId, quantity, price);
  }
  return { orderId, total };
}

module.exports = { createFromCart, createFromItems };
