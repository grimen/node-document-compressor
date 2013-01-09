require('sugar');
var fun = require('funargs');

// -----------------------
//  Constructor
// --------------------

// new Compressor ()
// new Compressor (options)
function Compressor () {
  var self = this, args = fun(arguments);

  self.klass = self.klass || Compressor;

  self.options = Object.merge(self.klass.defaults.options, args.objects()[0] || {}, true);
  self.engine = null;
  self.binary = false;
}

// -----------------------
//  Class
// --------------------

// .name
Compressor.__defineGetter__('name', function() {
  return this.name;
});

Compressor.defaults = {
  options: {}
};

Compressor.options = null;

Compressor.reset = function() {
  var self = this;

  if (self.defaults) {
    self.options = self.defaults.options;
  }
};

// -----------------------
//  Instance
// --------------------

// #name
Compressor.prototype.__defineGetter__('name', function() {
  return this.constructor.name;
});

// #compress (object)
Compressor.prototype.compress = function() {
  throw new Error("Not implemented");
};

// #decompress (data)
Compressor.prototype.decompress = function() {
  throw new Error("Not implemented");
};

// -----------------------
//  Export
// --------------------

module.exports = Compressor;
