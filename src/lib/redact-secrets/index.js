"use strict";

var traverse = require("traverse");
var isSecret = require("../is-secret");

module.exports = function(redacted) {
  return {
    map: map,
    forEach: forEach
  };

  function map(obj) {
    console.log("map: " + JSON.stringify(obj) + " end_map");
    return traverse(obj).map(function(val) {
      if (isSecret.key(this.key) || isSecret.value(val)) this.update(redacted);
    });
  }

  function forEach(obj) {
    console.log("forEach: " + JSON.stringify(obj) + " end_forEach");
    traverse(obj).forEach(function(val) {
      if (isSecret.key(this.key) || isSecret.value(val)) this.update(redacted);
    });
  }
};
