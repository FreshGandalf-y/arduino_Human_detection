const ws = new WebSocket('ws://' + location.host + '/ws/');

ws.onopen = function (err) {
  if (err) {
    console.log("connected");
  };
};

ws.onmessage = function (event) {
  const json = JSON.parse(event.data);

  if (json.type === 'responseHuData') {
    console.log(json);
    document.getElementById('showdata').innerHTML = json.data.data;

  }else {
    console.log('unnexpected data.type websocket', json);
  }
}

function requestHuDect() {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({type: 'requestHuData'}));

  } else {
    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({type: 'requestHuData'}));
    });
  };
};
