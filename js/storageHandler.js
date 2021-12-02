'use strict';

const storageHandler =
{
  storage: {
    // increment this when you create breaking changes in local storage format
    // versions must start from 1, version 0 is invalid
    formatVersion: 1,

    // type can be 'localStorage' or 'sessionStorage'
    available: function (type) {
      try {
        var storage = window[type],
          x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      }
      catch (e) {
        return false;
      }
    },

    local: {
      // Use this function over window.localStorage.setItem() because
      // localStorage.setItem() or sessionStorage.setItem() may throw
      // an exception if the storage is full.
      // in Mobile Safari (since iOS 5) it always throws when the user
      // enters private mode (Safari sets quota to 0 bytes in private mode,
      // contrary to other browsers, which allow storage in private mode,
      // using separate data containers).
      set: function (key, value) {
        try {
          window.localStorage.setItem(key.toString(), value.toString());
          return true;
        }
        catch (e) {
          return false;
        }
      },

      get: function (key) {
        var value = window.localStorage.getItem(key.toString());

        if (value === 'true')
          return true;
        if (value === 'false')
          return false;

        // isNan returns false for empty string
        // empty string is considered 0 by isNaN, but NaN by parseInt :)
        if (isNaN(value) || value === '')
          return value;

        // return value converted to number
        return +value;
      },

      remove: function (key) {
        var value = window.sessionStorage.removeItem(key.toString());

        if (value === 'true')
          return true;
        if (value === 'false')
          return false;

        // isNan returns false for empty string
        // empty string is considered 0 by isNaN, but NaN by parseInt :)
        if (isNaN(value) || value === '')
          return value;

        // return value converted to number
        return +value;

      },
      
      setFormatVersion: function () {
        storageHandler.storage.local.set('formatVersion', storageHandler.storage.formatVersion);
      },

      isOutdatedOrNotSet: function () {
        var version = storageHandler.storage.local.get('formatVersion');
        if (!version || version < storageHandler.storage.formatVersion)
          return true;

        return false;
      }
    },

    session: {
      // Use this function over window.sessionStorage.setItem() because
      // localStorage.setItem() or sessionStorage.setItem() may throw
      // an exception if the storage is full.
      // in Mobile Safari (since iOS 5) it always throws when the user
      // enters private mode (Safari sets quota to 0 bytes in private mode,
      // contrary to other browsers, which allow storage in private mode,
      // using separate data containers).
      set: function (key, value) {
        try {
          window.sessionStorage.setItem(key.toString(), value.toString());
          return true;
        }
        catch (e) {
          return false;
        }
      },

      get: function (key) {
        var value = window.sessionStorage.getItem(key.toString());

        if (value === 'true')
          return true;
        if (value === 'false')
          return false;

        // isNan returns false for empty string
        // empty string is considered 0 by isNaN, but NaN by parseInt :)
        if (isNaN(value) || value === '')
          return value;

        // return value converted to number
        return +value;
      },

      remove: function (key) {
        var value = window.sessionStorage.removeItem(key.toString());

        if (value === 'true')
          return true;
        if (value === 'false')
          return false;

        // isNan returns false for empty string
        // empty string is considered 0 by isNaN, but NaN by parseInt :)
        if (isNaN(value) || value === '')
          return value;

        // return value converted to number
        return +value;

      },

      setFormatVersion: function () {
        storageHandler.storage.session.set('formatVersion', storageHandler.storage.formatVersion);
      },

      isOutdatedOrNotSet: function () {
        var version = storageHandler.storage.session.get('formatVersion');
        if (!version || version < storageHandler.storage.formatVersion)
          return true;

        return false;
      }
    },
  }
}

export default storageHandler;