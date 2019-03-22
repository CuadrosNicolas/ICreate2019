import AsyncStorage from '@react-native-community/async-storage';
import {tagHandler} from '../../events';
export var app = null;
export function setApp(a) {
	app = a;
}
export var Tags = {}
export var TagsHandler = tagHandler(()=>{});
export function loadTags() {
	Tags =  {
			guitare: "045983A2BC5980",
			coeur: "045983A2BC5980",
			chasse_1: "045983A2BC5980",
			chasse_2: "045983A2BC5980",
			chasse_3: "045983A2BC5980",
			chasse_4: "045983A2BC5980",
			portrait: "045983A2BC5980"
		}
	_retrieveData = async () => {
		try {
			for (i of Object.getOwnPropertyNames(Tags)) {
				await AsyncStorage.getItem(i).then((r) => {

					Tags[i] = r;
				});
			}
		} catch (error) {
			alert(error)
			// Error retrieving data
		}
	};
		_storeData= async ()=>
	{
		await AsyncStorage.setItem("alreadyStored", "true");
		try {
			for (i of Object.getOwnPropertyNames(Tags)) {
				await AsyncStorage.setItem(String(i),Tags[i]);
			}
		} catch (error) {
			alert(error);
		}
	}
	_testData = async () => {
		await AsyncStorage.getItem("alreadyStored").then()
		 .catch(e=>{
			 _storeData();
		 });
		 await _retrieveData();
	};
	_testData();
	_retrieveData();
}
export function setTags(name, id) {

	Tags[name] = id;
	alert("Set : "+name + " "+id);
	AsyncStorage.setItem(name,id);
}