import React, {
	DeviceEventEmitter // will emit events that you can listen to
} from 'react-native';
import { SensorManager } from 'NativeModules';
import NfcManager, { NfcAdapter } from 'react-native-nfc-manager'
export function ShakingHandler(time,threshold,activation,stop,callback)
{
	begin = false;
	elapsedtime = 0;
	DeviceEventEmitter.addListener('Accelerometer', function (data) {
		let x = data.x;
		let y = data.y;
		let z = data.z;
		let sum = Math.abs(x) + Math.abs(y) + Math.abs(z);
		if (sum > threshold && begin == false) {
			activation();
			begin = true;
			elapsedtime = 0;
		} else if (sum > threshold) {
			elapsedtime += 0.1;
			if (elapsedtime >= time) {
				begin = 0;
				elapsedtime = 0;
				stop();
				callback();
			}
		}
		else if(sum <= threshold && begin==true) {
			stop();
			begin = 0;
			elapsedtime = 0;
		}
	}
	);
	SensorManager.startAccelerometer(100);
	this.stop = () => { SensorManager.stopAccelerometer();}
	return this;
}
export function isNFCEnabled()
{
	return NfcManager.isEnabled();
}
export function tagHandler(unknownHandler)
{
	this.tagMap = {};
	this.unknownHandler = unknownHandler;
	this.addTagHandler = function(tag,handler){this.tagMap[tag]=handler;};
	this.removeTagHandler = function(tag){delete this.tagMap[tag]};
	this.setUnknownHandler = function(handler){this.unknownHandler = handler};
	this.stop = function(){NfcManager.unregisterTagEvent()};
	NfcManager.registerTagEvent(
		tag => {
			if(this.tagMap[tag.id])
			{
				this.tagMap[tag.id]();
			}
			else
			{
				this.unknownHandler(tag);
			}
		},
		'',
		{
			invalidateAfterFirstRead: true,
			isReaderModeEnabled: true,
			readerModeFlags:
				NfcAdapter.FLAG_READER_NFC_A | NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK,
		},
	);
	return this;
}
function stopLight() {
	SensorManager.stopLightSensor();
	DeviceEventEmitter.removeAllListeners('LightSensor');
}
var lH = {
	"stop": stopLight
}
export function lightHandler(callback)
{
	SensorManager.startLightSensor(100);	DeviceEventEmitter.addListener('LightSensor', function (data) {
		callback(data.light);
	}
	);
	return lH;
}

function orientationHandler(callback)
{
	DeviceEventEmitter.addListener('Orientation', function (data) {
		callback(data.azimuth,data.pitch,data.roll);
	}
	);
	SensorManager.startOrientation(100);
	this.stop = () => { SensorManager.stopOrientation(); }
	return this;
}
function stop(){
	SensorManager.stopGyroscope();
}
var gyroHandler = {
	"stop":stop
}
export function gyroscopeHandler(callback) {
	SensorManager.startGyroscope(100);
	DeviceEventEmitter.addListener('Gyroscope', function (data) {
		callback(data.x, data.y, data.z);
	}
	);
	return gyroHandler;
}

function AccelerometerHandler(callback) {
	DeviceEventEmitter.addListener('Accelerometer', function (data) {
		callback(data.x, data.y, data.z);
	}
	);
	SensorManager.startAccelerometer(100);
	this.stop = () => { SensorManager.stopAccelerometer(); }
	return this;
}