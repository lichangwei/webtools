
var tools = global.tools = module.exports = {
  root: module.parent.__dirname,
  getPath: function( file ){
    return require('path').join(this.root, file);
  }
};
var todos = [];
var libs = {};

['uglifyjs', 'less', 'manifest'].map(function(it){
  libs[it] = require('./lib/' + it);
  tools[it] = function( config ){
    todos.push({
      'operation': it,
      'config': config
    });
    !start.running && start();
    return this;
  };
});

function start(){
  start.running = true;
  setTimeout(function(){
    if(todos.length === 0){
      start.running = false;
      console.log('Done.');
      return ;
    }
    var op = todos.shift();
    libs[op.operation](op.config, start);
  }, 0);
}
start.running = false;



