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
    const collectedValuesP = [];
    const collectedValuesE = [];

    for (let i in json.resData) {
      const string = json.resData[i]          // z. B. "E150P153"
      const match = string.match(/E(\d+)P(\d+)/);

      if (match) {
        const ValueE = match[1]; // "150"
        const ValueP = match[2]; // "153"

        console.log("E=${ValueE}, P=${ValueP");
        collectedValuesP.push(ValueP);
        collectedValuesE.push(ValueE);
      } else {
        console.log("no aproprate string", string)
      }

    }
   setlabels(null, collectedValuesP, collectedValuesE)

    function setlabels(err, valuesP, valuesE) {
      datalabels = valuesP;
      datadata = valuesE;
      const ctx = document.getElementById('showdata').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: datalabels,
          datasets: [{
            label: 'Personenabstand zum Sensor (in cm)',
            data: datadata,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });  
     }
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


