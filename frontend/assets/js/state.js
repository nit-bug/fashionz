(function (global) {
  'use strict';

  var CART_KEY = 'fashionz_cart';
  var USER_KEY = 'fashionz_user';
  var listeners = { cart: [], user: [] };

  function getCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function setCart(items) {
    if (!Array.isArray(items)) items = [];
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    listeners.cart.forEach(function (fn) { fn(items); });
  }

  function addToCart(item) {
    var cart = getCart();
    var existing = cart.find(function (x) { return x.productId === item.productId; });
    if (existing) {
      existing.quantity = (existing.quantity || 0) + (item.quantity || 1);
    } else {
      cart.push({
        productId: item.productId,
        quantity: item.quantity || 1,
        title: item.title,
        price: item.price,
        image_url: item.image_url
      });
    }
    setCart(cart);
  }

  function removeFromCart(productId) {
    var cart = getCart().filter(function (x) { return x.productId !== productId; });
    setCart(cart);
  }

  function getTotal() {
    return getCart().reduce(function (sum, x) {
      return sum + (x.price || 0) * (x.quantity || 0);
    }, 0);
  }

  function getCartCount() {
    return getCart().reduce(function (sum, x) { return sum + (x.quantity || 0); }, 0);
  }

  function getUser() {
    try {
      var raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setUser(user) {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
    listeners.user.forEach(function (fn) { fn(user); });
  }

  function onCartChange(fn) {
    listeners.cart.push(fn);
  }

  function onUserChange(fn) {
    listeners.user.push(fn);
  }

  global.FashionzState = {
    getCart: getCart,
    setCart: setCart,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    getTotal: getTotal,
    getCartCount: getCartCount,
    getUser: getUser,
    setUser: setUser,
    onCartChange: onCartChange,
    onUserChange: onUserChange
  };
})(typeof window !== 'undefined' ? window : this);
