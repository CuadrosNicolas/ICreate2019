var exampleSocket = new WebSocket('ws://192.168.0.11:8080');

var btn = document.getElementById('envoyer');
var txt = document.getElementById('message');

exampleSocket.onopen = function(event) {

  exampleSocket.onmessage = function (event) {
    console.log(event.data);
  };


  btn.addEventListener('click', sendMsg);

  function sendMsg(){
    packet = JSON.stringify({ cmd: cmd.value, arg: arg.value });
    exampleSocket.send(packet);
    cmd.value = "";
    arg.value = "";
  }
  console.log("Connexion etablie.");

  // Lorsque la connexion se termine.
  exampleSocket.onclose = function(event) {
      console.log("Connexion terminee.");
  };
};