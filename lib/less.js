
'use strict';

module.exports = function( config, callback ){
  var input  = config.input;
  var output = config.output;
  
  (typeof input === 'string') && (input = [input]);
  
  var done = 0;
  var parsed = [];
  
  function combine(){
    if( done !== input.length ) return;
    var result = parsed.map(function(a, b){
      return a + '\n' + b;
    });
    output = tools.getPath(output);
    require('fs').writeFileSync(output, result);
    console.log('Updated: ' + output);
    callback && callback();
  }
  
  for( var i = 0; i < input.length; i++ ){
    (function(){
      var _i = i;
      parse( input[_i], config.compress, function( parsed_str ){
        parsed[_i] = parsed_str;
        done++;
        combine();
      });
    })();
  }
};

function parse( path, compress, callback ){
  path = tools.getPath(path);
  var str = require('fs').readFileSync( path, 'utf-8' );
  var folder = require('path').dirname(path);
  var parser = new(require('less').Parser)({paths: [folder]});
  parser.parse(str, function (e, tree) {
    if( e ) throw e;
    callback( tree.toCSS({compress: !!compress}) );
  });
}