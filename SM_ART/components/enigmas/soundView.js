import React, {
	Component,
} from 'react';
import { Image, View, StyleSheet, Dimensions } from 'react-native'
import { app,Tags,TagsHandler} from './enigmaBase';
import { InterView } from './interView';
var { height, width } = Dimensions.get('window');
export class SoundView extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.tagHandler = TagsHandler;
		this.tagHandler.addTagHandler(Tags.coeur, () => {
			this.tagHandler.removeTagHandler(Tags.coeur);
			app.nextTimed(3000);
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

