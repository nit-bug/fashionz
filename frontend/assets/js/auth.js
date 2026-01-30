(function (global) {
  'use strict';

  var TOKEN_KEY = 'fashionz_token';

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function setToken(token) {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }

  function isLoggedIn() {
    return !!getToken();
  }

  function logout() {
    setToken(null);
    if (global.FashionzState && global.FashionzState.setUser) {
      global.FashionzState.setUser(null);
    }
  }

  function requireAuth(redirectUrl) {
    if (!isLoggedIn()) {
      var url = redirectUrl || 'login.html';
      if (window.location.pathname.indexOf('login') === -1) {
        url += '?redirect=' + encodeURIComponent(window.location.href);
      }
      window.location.href = url;
      return false;
    }
    return true;
  }

  global.FashionzAuth = {
    getToken: getToken,
    setToken: setToken,
    isLoggedIn: isLoggedIn,
    logout: logout,
    requireAuth: requireAuth
  };
})(typeof window !== 'undefined' ? window : this);
