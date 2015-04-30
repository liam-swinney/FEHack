var connect = require('connect');
var serveStatic = require('serve-static');
connect({port:1234}).use(serveStatic(__dirname)).listen(1234);