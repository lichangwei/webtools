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
            if( config.operation !== 'merger' ){
                code = uglify( code )
            }
            return code;
        }).reduce(function(a, b){
            return a + '\n' + b;
        });
    
    output = tools.getPath(output);
    fs.writeFileSync(output, compressed);
    
    console.log('Updated: ' + output);
    callback && callback();
};

function uglify( code ){
    var jsp = require('uglify-js').parser;
    var pro = require('uglify-js').uglify;
    
    var ast = jsp.parse(code);  
    ast = pro.ast_lift_variables(ast);  
    ast = pro.ast_mangle(ast);  
    ast = pro.ast_squeeze(ast);  
    return pro.gen_code(ast);  
}
