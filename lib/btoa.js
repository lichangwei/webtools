
'use strict';

module.exports = function atob(str) {
  return new Buffer(str, 'utf8').toString('base64');
}