const WebSocket = require("ws");
const fs = require("fs");

function setupWebSocket(server) {
  const wss = new WebSocket.Server({server});

  wss.on("connection", ws => {
    console.log("new client connected");

    ws.on("message", async function (message) {
      try {
        const data = JSON.parse(message);
        console.log('recived message', data);

        if (data.type === 'requestHuData') {
          sendData(data,);
          console.log('data would be send...')
        } else if (data.type === 'error') {
          console.log("hast halt verkackt ne?");
        } else {
          console.log('unexpected data.type', data)
        }
      } catch (error) {
        console.log(error);
      }
    });

    function sendData(arg, err) {
      console.log('response:')
      if (arg.type === 'requestHuData') {
      fs.readFile('humanDetecData.txt', (err, data) => {
        if (err) {
          console.err(error);
        } else {
        ws.send(JSON.stringify({type: 'responseHuData', data}));
        console.log('data is shipped')
      };
    });

  } else if (err) {
    console.log('something went wrong with sendData')
  };
};



  });
}

module.exports = { setupWebSocket };
