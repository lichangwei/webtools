
var tools = require('../index.js');

tools.uglifyjs({
  'input'   : ['public/scripts/a.js',
    'public/scripts/b.js'],
  'licence'   : 'The MIT Licence. https://github.com/lichangwei/webtools.git',
  'initScript': '"I am initScript."',
  'output'  : 'public/scripts/main.js',
  'operation' : 'uglify' //default
}).less({
  'input'   : ['public/css/style.less'],
  'output'  : 'public/css/style.css',
  'compress'  : true // default
}).manifest( 'public/proj.manifest' );
