var fs = require('fs');
var mv = require('mv');
var path = require('path');
var util = require('util');
var formidable = require('formidable');
exports.list = function(req, res){
  var files = fs.readdirSync(__dirname+'../../public/uploads');
  
  res.render('photos', { photos: files });
};

exports.add = function(req, res) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  var file;
  form.on('error', function(err) {
    console.log(err);
  });
  form.on('end', function() {
    console.log('end');
  });
  form.on('file', function(name, file) {
    console.log('file.path ', file.path);
    mv(file.path, __dirname+'../../public/uploads/upload' + new Date().getTime() + '.png', function(err) {
      if(err) {
        console.log(err);
      } else {
      }
    });
  });
  form.on('fileBegin', function(name, file) {
    console.log('fileBegin');
  });
  form.on('field', function(name, value) {
    console.log('field');
  });
  form.on('progress', function(bytesReceived, bytesExpected) {
    console.log('progress ', bytesReceived, bytesExpected);
  });
  form.parse(req, function(err, fields, files) {
    if(err) {
      console.log(err);
    }
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
    
  });
};
