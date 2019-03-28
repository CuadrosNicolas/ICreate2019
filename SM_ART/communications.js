import { AsyncStorage } from 'react-native';
/**
 * File for socket management
 * allow to play sounds using simple command
 */
export var getSocket = () => { alert("ERREUR") };
export var getIp = ()=>{alert("ERREUR")};
export var setIp = (ip) => { AsyncStorage.setItem('server_ip', ip);};
//basic function to launch an play sound
//name must me in the server sound list
export function play_ambiance(name)
{
	getSocket().send(JSON.stringify({ cmd: "playa", arg: name })); // send a message
}
export function stop_ambiance(name) {
	getSocket().send(JSON.stringify({ cmd: "stopa", arg: name })); // send a message
}
export function stopall() {
	getSocket().send(JSON.stringify({ cmd: "stopall", arg: "" })); // send a message
}
export function play_sound(name,callback=0) {
	getSocket().send(JSON.stringify({ cmd: "play", arg: name })); // send a message
	getSocket().onmessage = (e) =>
	{
		if(callback)
			callback(e);
		getSocket().onmessage = ()=>{ }
	}
}
export function stop_sound(name) {
	getSocket().send(JSON.stringify({ cmd: "stop", arg: name })); // send a message
}

export function load(error)
{
	/**
	 * Connect the phone to the sound server
	 */
	try
	{
		AsyncStorage.getItem('server_ip').then((server_ip =>{
		socket = new WebSocket('ws://'+server_ip+':8080', 'echo-protocol');
		getIp = () => { return server_ip };
		getSocket = () => { return socket };
		var started = false;
		socket.onopen = () => {
			started = true;
		};
		socket.onerror = (e) => {
			// an error occurred
			alert(e.message);
			error(e);
		};
		// Listen for messages
		socket.onmessage = (e) => {
		};
		socket.onclose = (e) => {
			if(started)
				alert("Erreur : Connexion au serveur interrompu");
			started = true;
		};
		}));
		return true;
	}
	catch(error)
	{
		alert("Erreur : L'adresse ip du serveur n'a pas été enregistré sur l'appareil");
		return false;
	}
}
export function setMessageHandler(handler)
{
	if(socket)
	{
		socket.onmessage = handler;
	}
	else
	{
		alert("The socket is not connected");
	}
}