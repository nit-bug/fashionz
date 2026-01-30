const productService = require('../services/product.service');

function list(req, res) {
  try {
    const { category, limit } = req.query;
    const products = productService.list({ category, limit: limit ? parseInt(limit, 10) : undefined });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}

function getById(req, res) {
  const product = productService.getById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
}

module.exports = { list, getById };
