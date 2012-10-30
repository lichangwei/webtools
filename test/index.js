
var tools = require('../index.js');

tools.uglifyjs({
    'input': ['public/scripts/a.js',
        'public/scripts/b.js'],
    'output': 'public/scripts/main.js',
    'operation': 'uglify' //default
}).less({
    'input': ['public/css/style.less'],
    'output': 'public/css/style.css',
    'compress': true // default
}).manifest( 'public/proj.manifest' );
