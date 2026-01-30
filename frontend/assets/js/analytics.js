(function (global) {
  'use strict';

  function track(eventName, data) {
    if (global.console && global.console.log && (global.location && global.location.hostname === 'localhost' || !global.location)) {
      global.console.log('[Analytics]', eventName, data || '');
    }
    if (global.gtag) global.gtag('event', eventName, data);
    if (global.ga) global.ga('send', 'event', eventName, JSON.stringify(data || {}));
  }

  global.FashionzAnalytics = {
    track: track,
    pageView: function (path, title) { track('page_view', { path: path, title: title }); },
    addToCart: function (productId, title, value) { track('add_to_cart', { product_id: productId, title: title, value: value }); },
    purchase: function (orderId, total) { track('purchase', { order_id: orderId, value: total }); }
  };
})(typeof window !== 'undefined' ? window : this);
