
'use strict';

module.exports = function( filename, callback ){
  var fs = require('fs');
  filename = tools.getPath(filename);

  var content = fs.readFileSync(filename, 'utf-8');
  
  content = update( content );
    
  fs.writeFileSync(filename, content);
  
  console.log('Update: ' + filename);
  callback && callback();
}

var regexp = /(#\s*version\s*)(\d+)?\b/i;

function update( content ){
  var upgrade = false;
  
  content = content.replace(regexp, function(match, prefix, version){
    if( !version ) version = 1;
    upgrade = parseInt(version) + 1;
    return prefix + upgrade;
  });
  
  if( upgrade === false ){
    content = '#version 1\n' + content;
  }
  
  return content;
}
