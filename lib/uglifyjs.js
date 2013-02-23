'use strict';

var path = require('path');

module.exports = function( config, callback ){
  var input  = config.input;
  var output = config.output;
  var separator = '\n;';
  
  var fs = require('fs');
  
  (typeof input === 'string') && (input = [input]);
  
  var compressed = input.map(function( filename ){
      // TODO directory
      filename = tools.getPath(filename);
      var code = fs.readFileSync(filename, 'utf-8');
      return uglifyIfNeed(config.operation, code);
    }).join(separator);
  
  if( config.licence ){
    compressed = '/* ' + config.licence + ' */\n' + compressed;
  }
  if( config.initScript ){
    compressed += separator + uglifyIfNeed(config.operation, config.initScript);
  }

  output = tools.getPath(output);
  fs.writeFileSync(output, compressed);
  
  console.log('Updated: ' + output);
  callback && callback();
};

function uglifyIfNeed(operation, code){
  return operation !== 'merger' ? uglify(code) : code;
}

function uglify( code ){
  return require('uglify-js').minify(code, {fromString: true}).code;
}
