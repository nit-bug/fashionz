require('dotenv').config();
const { db } = require('./index');
const bcrypt = require('bcryptjs');

const products = [
  { title: 'Wool Blend Coat', description: 'Classic tailored coat in a soft wool blend. Perfect for transitional weather.', price: 189, image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80', category: 'Women', reviews_count: 32 },
  { title: 'Leather Sneakers', description: 'Minimal leather sneakers that pair with everything. Comfort meets style.', price: 145, image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80', category: 'Men', reviews_count: 48 },
  { title: 'Linen Shirt', description: 'Lightweight linen shirt in a relaxed fit. Ideal for warm days and layering.', price: 78, image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80', category: 'Men', reviews_count: 26 },
  { title: 'Canvas Tote', description: 'Spacious canvas tote with leather trim. Everyday carry with a clean look.', price: 62, image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80', category: 'Accessories', reviews_count: 41 },
  { title: 'Silk Blouse', description: 'Elegant silk blouse for work or evening. Timeless cut and finish.', price: 120, image_url: 'https://images.unsplash.com/photo-1564257631407-2f71d0efe2b3?w=500&q=80', category: 'Women', reviews_count: 28 },
  { title: 'Cashmere Scarf', description: 'Soft cashmere scarf in neutral tones. A winter essential.', price: 95, image_url: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500&q=80', category: 'Accessories', reviews_count: 55 },
];

const insertProduct = db.prepare(`
  INSERT INTO products (title, description, price, image_url, category, reviews_count)
  VALUES (@title, @description, @price, @image_url, @category, @reviews_count)
`);

const insertUser = db.prepare(`
  INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)
`);

// Seed products (idempotent: clear and re-insert for simplicity)
db.exec('DELETE FROM order_items');
db.exec('DELETE FROM orders');
db.exec('DELETE FROM cart_items');
db.exec('DELETE FROM products');

products.forEach((p) => insertProduct.run(p));

// Test user: test@fashionz.com / password123
const hash = bcrypt.hashSync('password123', 10);
try {
  insertUser.run('test@fashionz.com', hash, 'Test User', 'customer');
  console.log('Seeded: products and test user test@fashionz.com / password123');
} catch (e) {
  if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') console.log('Test user already exists. Seeded products.');
  else throw e;
}
