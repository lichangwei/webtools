'use strict';

var path = require('path');

module.exports = function( config, callback ){
  var input  = config.input;
  var output = config.output;
  
  var fs = require('fs');
  
  (typeof input === 'string') && (input = [input]);
  
  var compressed = input.map(function( filename ){
      // TODO directory
      filename = tools.getPath(filename);
      var code = fs.readFileSync(filename, 'utf-8');
      return uglifyIfNeed(config.operation, code);
    }).reduce(function(a, b){
      return a + '\n' + b;
    });
  
  if( config.licence ){
    compressed = '/* ' + config.licence + ' */\n' + compressed;
  }
  if( config.initScript ){
    compressed += '\n' + uglifyIfNeed(config.operation, config.initScript);
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
  var jsp = require('uglify-js').parser;
  var pro = require('uglify-js').uglify;
  
  var ast = jsp.parse(code);  
  ast = pro.ast_lift_variables(ast);  
  ast = pro.ast_mangle(ast);  
  ast = pro.ast_squeeze(ast);  
  return pro.gen_code(ast);  
}
