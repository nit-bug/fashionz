const { productModel } = require('../models');

function list(opts = {}) {
  return productModel.findAll(opts);
}

function getById(id) {
  const product = productModel.findById(Number(id));
  if (!product) return null;
  return product;
}

module.exports = { list, getById };
