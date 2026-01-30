(function (global) {
  'use strict';

  var BASE = (global.API_BASE !== undefined) ? global.API_BASE : 'http://localhost:5000';

  function headers(includeAuth) {
    var h = { 'Content-Type': 'application/json' };
    if (includeAuth && global.FashionzAuth && global.FashionzAuth.getToken()) {
      h['Authorization'] = 'Bearer ' + global.FashionzAuth.getToken();
    }
    return h;
  }

  function handleResponse(res) {
    if (!res.ok) {
      return res.json().then(function (data) {
        throw { status: res.status, message: (data && data.error) || res.statusText };
      }).catch(function (err) {
        if (err.status) throw err;
        throw { status: res.status, message: res.statusText };
      });
    }
    return res.json();
  }

  var api = {
    getProducts: function (opts) {
      var q = new URLSearchParams(opts || {}).toString();
      var url = BASE + '/api/products' + (q ? '?' + q : '');
      return fetch(url).then(handleResponse);
    },

    getProduct: function (id) {
      return fetch(BASE + '/api/products/' + id).then(handleResponse);
    },

    login: function (email, password) {
      return fetch(BASE + '/api/auth/login', {
        method: 'POST',
        headers: headers(false),
        body: JSON.stringify({ email: email, password: password })
      }).then(handleResponse);
    },

    getMe: function () {
      return fetch(BASE + '/api/auth/me', { headers: headers(true) }).then(handleResponse);
    },

    addToCart: function (productId, quantity) {
      return fetch(BASE + '/api/cart', {
        method: 'POST',
        headers: headers(true),
        body: JSON.stringify({ productId: productId, quantity: quantity || 1 })
      }).then(handleResponse);
    },

    getCart: function () {
      return fetch(BASE + '/api/cart', { headers: headers(true) }).then(handleResponse);
    },

    createOrder: function (items) {
      return fetch(BASE + '/api/orders', {
        method: 'POST',
        headers: headers(true),
        body: JSON.stringify(items ? { items: items } : {})
      }).then(handleResponse);
    }
  };

  global.FashionzAPI = api;
})(typeof window !== 'undefined' ? window : this);
