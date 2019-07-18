let http = require('http');
let static = require('node-static');
let fileServer = new static.Server('.');
let path = require('path');
let fs = require('fs');
let debug = require('debug')('example:resume-upload');

let uploads = Object.create(null);

function onUpload(req, res) {

  let fileId = req.headers['x-file-id'];
  let startByte = req.headers['x-start-byte'];

  if (!fileId) {
    res.writeHead(400, "No file id");
    res.end();
  }

  // мы будем сохранять файлы "в никуда"
  let filePath = '/dev/null';
  // хотя могли бы использовать реальный путь, например
  // let filePath = path.join('/tmp', fileId);

  debug("onUpload fileId: ", fileId);

  // инициируем новую загрузку
  if (!uploads[fileId]) uploads[fileId] = {};
  let upload = uploads[fileId];

  debug("bytesReceived:" + upload.bytesReceived + " startByte:" + startByte)

  let fileStream;

  // если стартовый байт 0 или не указан - создаём новый файл, иначе проверяем размер и добавляем данные к уже существующему файлу
  if (!startByte) {
    upload.bytesReceived = 0;
    fileStream = fs.createWriteStream(filePath, {
      flags: 'w'
    });
    debug("New file created: " + filePath);
  } else {
    // we can check on-disk file size as well to be sure
    if (upload.bytesReceived != startByte) {
      res.writeHead(400, "Wrong start byte");
      res.end(upload.bytesReceived);
      return;
    }
    // добавить к существующему файлу
    fileStream = fs.createWriteStream(filePath, {
      flags: 'a'
    });
    debug("File reopened: " + filePath);
  }


  req.on('data', function(data) {
    debug("bytes received", upload.bytesReceived);
    upload.bytesReceived += data.length;
  });

  // сохранить тело запроса в файл
  req.pipe(fileStream);

  // когда обработка запроса завершена и все данные записаны
  fileStream.on('close', function() {
    if (upload.bytesReceived == req.headers['x-file-size']) {
      debug("Upload finished");
      delete uploads[fileId];

      // мы можем сделать что-то ещё с загруженным файлом

      res.end("Success " + upload.bytesReceived);
    } else {
      // соединение потеряно, остаются незавершённые загрузки
      debug("File unfinished, stopped at " + upload.bytesReceived);
      res.end();
    }
  });

  // в случае ошибки ввода/вывода завершаем обработку запроса
  fileStream.on('error', function(err) {
    debug("fileStream error");
    res.writeHead(500, "File error");
    res.end();
  });

}

function onStatus(req, res) {
  let fileId = req.headers['x-file-id'];
  let upload = uploads[fileId];
  debug("onStatus fileId:", fileId, " upload:", upload);
  if (!upload) {
    res.end("0")
  } else {
    res.end(String(upload.bytesReceived));
  }
}


function accept(req, res) {
  if (req.url == '/status') {
    onStatus(req, res);
  } else if (req.url == '/upload' && req.method == 'POST') {
    onUpload(req, res);
  } else {
    fileServer.serve(req, res);
  }

}




// -----------------------------------

if (!module.parent) {
  http.createServer(accept).listen(8080);
  console.log('Server listening at port 8080');
} else {
  exports.accept = accept;
}
