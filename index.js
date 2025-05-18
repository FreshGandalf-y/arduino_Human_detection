const http = require("http");
const { SerialPort } = require("serialport");
const readline = require('@serialport/parser-readline');
const { SerialPortlist } = require('@serialport/list');
const { serialportStreamm } = require('@serialport/stream');
const fs = require("fs");
const Bindings = require('@serialport/bindings-cpp');
const { setupWebSocket } = require('./websocket.js');


const serveport = 6070;

SerialPortlist

const serialport = new SerialPort({
  path: '/dev/tty.usbserial',
  baudRate:9600,
  bindings: Bindings
});

serialport.on('open', () => {
  console.log('serial Port is open');
});

serialport.on('data', data => {
  const lastsignal = data.toString();
  console.log(lastsignal);

  fs.readFile('humanDetectData.txt', (err, data) => {
    if (err) {
      console.err(err);
    } else {
      var filedata = data;
      const newData = filedata + lastsignal;
      fs.writeFile('humanDetectData.txt', newData, (err) => {
        if (err) {
          console.err(err);
        } else {
          console.log('signal written')
        }
      });
    };
  });
});

serialport.on('error', err => {
  console.error('Fehler:', err);
})

const server = http.createServer(function (req, res) {
  var Filepath;
  
  if (req.url === '/') {                         // url = '/'
    fs.readFile('index.html', (err, contant) => {
      if (err) {
        console.err('cannot read index.html');
        res.statusCode = 404;
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(contant);

      };
    });
    

  } else if (req.url === '/main.js') {                                                                                    // else {the rest}
    fs.readFile('public/main.js', (err, contant) => {
      if (err) {
        console.err('cannot read index.html');
        res.statusCode = 404;
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(contant);

      };
    });

  } else {
    res.statusCode = 404;
  }
});

setupWebSocket(server);

server.listen(6070, () => {
  console.log('\x1b[33mserver is running on port: 6070\x1b[0m:');
});
