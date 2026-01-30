const { db } = require('../db');

const productModel = {
  findAll(opts = {}) {
    let sql = 'SELECT * FROM products ORDER BY id';
    const params = [];
    if (opts.category) {
      sql = 'SELECT * FROM products WHERE category = ? ORDER BY id';
      params.push(opts.category);
    }
    if (opts.limit) {
      sql += ' LIMIT ?';
      params.push(opts.limit);
    }
    return opts.category || opts.limit ? db.prepare(sql).all(...params) : db.prepare(sql).all();
  },

  findById(id) {
    return db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  },
};

const userModel = {
  findByEmail(email) {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  },

  findById(id) {
    return db.prepare('SELECT id, email, name, role, created_at FROM users WHERE id = ?').get(id);
  },
};

const orderModel = {
  create(userId, total) {
    const result = db.prepare('INSERT INTO orders (user_id, total) VALUES (?, ?)').run(userId, total);
    return result.lastInsertRowid;
  },

  addItem(orderId, productId, quantity, price) {
    db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)').run(orderId, productId, quantity, price);
  },
};

const cartModel = {
  getByUserId(userId) {
    return db.prepare(`
      SELECT c.id, c.product_id, c.quantity, p.title, p.price, p.image_url
      FROM cart_items c
      JOIN products p ON p.id = c.product_id
      WHERE c.user_id = ?
    `).all(userId);
  },

  add(userId, productId, quantity) {
    const existing = db.prepare('SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?').get(userId, productId);
    if (existing) {
      db.prepare('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?').run(quantity, existing.id);
    } else {
      db.prepare('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)').run(userId, productId, quantity);
    }
  },

  clear(userId) {
    db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(userId);
  },
};

module.exports = { productModel, userModel, orderModel, cartModel };
