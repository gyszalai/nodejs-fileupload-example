/** 
 * Code based on Node.js in Action by Mike Cantelon, TJ Holowaychuk and Nathan Rajlich
 * Chapter 4.4.2 - Handling uploaded files with using node-formidable 
 */
var http = require('http'),
    formidable = require ('formidable'),
    util = require('util');
    
http.createServer(function(req, res) {
    if (req.url === '/' && req.method.toLowerCase() === 'get') {
        sendForm(res);
    }
    if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
        parseFormData(req, res);
    }
}).listen(8888);

function sendForm(res) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
            '<form action="/upload" enctype="multipart/form-data" method="post">' +
            '<input type="text" name="title"/><br/>' +
            '<input type="file" name="file1"/><br/>' +
            '<input type="file" name="file2"/><br/>' +
            '<input type="submit" value="Submit">' +
            '</form>'
    );
}

function parseFormData(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log('Error: ' + err);
        console.log('Fields: ' + util.inspect(fields));
        console.log('Files: ');
        for (var f in files) {
            console.log('    file: ' + f.name);
        }
        sendForm(res);
    });
    form.on('progress', function(bytesReceived, bytesExpected) {
        console.log('bytes received: ' + bytesReceived);
        console.log('bytes expected: ' + bytesExpected);
    });
    form.on('file', function(name, file) {
        console.log('File received ('+name+'): ' + file.name);
    });
    
    
    
}