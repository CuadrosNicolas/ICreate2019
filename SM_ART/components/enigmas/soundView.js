import React, {
	Component,
} from 'react';
import { Image, View, StyleSheet, Dimensions } from 'react-native'
import { app,Tags,TagsHandler} from './enigmaBase';
import { InterView } from './interView';
var { height, width } = Dimensions.get('window');
import { play_sound, stop_sound, play_ambiance,stop_ambiance } from '../../communications';
export class SoundView extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		play_ambiance("cadenas");
		this.tagHandler = TagsHandler;
		this.tagHandler.addTagHandler(Tags.coeur, () => {
			this.tagHandler.removeTagHandler(Tags.coeur);
			stop_ambiance("cadenas");
			app.nextSound("enigme4");
		});
	}
	componentWillUnmount() {

	}
	render() {
		return (
			<InterView/>
		);
	}
}

