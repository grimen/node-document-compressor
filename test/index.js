var helper = require('./helper'),
    assert = helper.assert,
    debug = helper.debug;

var Compressor = require('..'),
    compressor = new Compressor();

// -----------------------
//  Test
// --------------------

module.exports = {

  'Compressor': {
    'new': {
      '()': function() {
        assert.instanceOf ( compressor, require('..') );

        Compressor.reset();

        var compressor2 = new Compressor();

        assert.typeOf ( compressor2.options, 'object' );
        assert.deepEqual ( compressor2.options.custom, undefined );
      },

      '(options)': function() {
        Compressor.reset();

        var compressor2 = new Compressor({custom: {foo: 'bar'}});

        assert.equal ( compressor2.url, null );
        assert.typeOf ( compressor2.options, 'object' );
        assert.deepEqual ( compressor2.options.custom, {foo: 'bar'} );
      }
    },

    '.klass': function() {
      assert.property ( compressor, 'klass' );
      assert.equal ( compressor.klass, Compressor );
    },

    '.name': function() {
      assert.property ( Compressor, 'name' );
      assert.equal ( Compressor.name, 'Compressor' );
    },

    '.defaults': function() {
      assert.property ( Compressor, 'defaults' );

      assert.typeOf ( Compressor.defaults.options, 'object' );
    },

    '.options': function() {
      assert.property ( Compressor, 'options' );
      assert.typeOf ( Compressor.options, 'null' );
    },

    '.reset()': function() {
      assert.property ( Compressor, 'reset' );
      assert.typeOf ( Compressor.reset, 'function' );

      Compressor.options = {foo: "bar"};
      assert.deepEqual ( Compressor.options, {foo: "bar"} );
      assert.deepEqual ( Compressor.defaults.options, {} );

      Compressor.reset();

      assert.equal ( Compressor.options, Compressor.defaults.options );
    }
  },

  'Compressor.prototype': {
    '.name': function() {
      assert.property ( compressor, 'name' );
      assert.equal ( compressor.name, 'Compressor' );
    },

    '#options': function() {
      assert.property ( compressor, 'options' );
      assert.typeOf ( compressor.options, 'object' );
    },

    '#engine': function() {
      assert.property ( compressor, 'engine' );
      assert.typeOf ( compressor.engine, 'null' );
    },

    '#binary': function() {
      assert.property ( compressor, 'binary' );
      assert.typeOf ( compressor.binary, 'boolean' );
      assert.equal ( compressor.binary, false );
    },

    '#compress': function() {
      assert.property ( compressor, 'compress' );
      assert.typeOf ( compressor.compress, 'function' );
      assert.throws ( compressor.compress, Error );
    },

    '#decompress': function() {
      assert.property ( compressor, 'decompress' );
      assert.typeOf ( compressor.decompress, 'function' );
      assert.throws ( compressor.decompress, Error );
    }
  }

};
