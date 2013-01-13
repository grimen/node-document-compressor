var helper = require('./helper'),
    assert = helper.assert,
    debug = helper.debug;

// -----------------------
//  Spec: Compressor
// --------------------

module.exports = function(name, spec) {
  var Compressor = spec.module;
  var engine = spec.engine;
  var options = spec.options || {};
  var pack = spec.pack;
  var unpack = spec.unpack;
  var binary = spec.binary;

  var compressor;

  return (function() {
    var Spec = {};

    Spec.before = function() {
      compressor = new Compressor();
    };

    Spec[name] = {
      'new': {
        '()': function() {
          assert.instanceOf ( compressor, Compressor );

          Compressor.reset();

          var compressor2 = new Compressor();

          assert.equal ( compressor2.url, null );
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

      '.defaults': function() {
        assert.property ( Compressor, 'defaults' );

        assert.equal ( Compressor.defaults.url, null );
        assert.typeOf ( Compressor.defaults.options, 'object' );
      },

      '.options': function() {
        assert.property ( Compressor, 'options' );
        assert.typeOf ( Compressor.options, 'object' );
        assert.deepEqual ( Compressor.options, options );
      },

      '.reset()': function() {
        assert.property ( Compressor, 'reset' );
        assert.typeOf ( Compressor.reset, 'function' );

        Compressor.options = {foo: "bar"};
        assert.deepEqual ( Compressor.options, {foo: "bar"} );

        Compressor.reset();

        assert.equal ( Compressor.url, null );
      }
    };

    Spec[name + '.prototype'] = {
      '#options': function() {
        assert.property ( compressor, 'options' );
        assert.typeOf ( compressor.options, 'object' );
      },

      '#engine': function() {
        assert.property ( compressor, 'engine' );
        assert.equal ( compressor.engine, engine );
      },

      '#binary': function() {
        assert.property ( compressor, 'binary' );
        assert.equal ( compressor.binary, binary );
      },

      '#compress': {
        '': function() {
          assert.property ( compressor, 'compress' );
          assert.typeOf ( compressor.compress, 'function' );
        },

        '(uncompressed string)': function() {
          var input = JSON.stringify({_id: 1, a: "foo", b: "bar"});

          assert.deepEqual ( compressor.compress(input), pack(input) );
        },

        '(uncompressed object)': function() {
          var input = {_id: 1, a: "foo", b: "bar"};

          assert.deepEqual ( compressor.compress(input), pack(JSON.stringify(input)) );
        }
      },

      '#decompress': {
        '': function() {
          assert.property ( compressor, 'decompress' );
          assert.typeOf ( compressor.decompress, 'function' );
        },

        '(compressed string)': function() {
          var input = JSON.stringify({_id: 1, a: "foo", b: "bar"});
          var compressed = pack(input);

          assert.deepEqual ( compressor.decompress(compressed), unpack(compressed) );
        },

        '(compressed object)': function() {
          var input = {_id: 1, a: "foo", b: "bar"};
          var compressed = pack(JSON.stringify(input));

          assert.deepEqual ( compressor.decompress(compressed), unpack(compressed) );
        }
      }
    };

    return Spec;
  }());
};

