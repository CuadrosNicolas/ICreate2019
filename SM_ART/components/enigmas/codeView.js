import React, {
	Component,
} from 'react';
import { Image, View, StyleSheet } from 'react-native'
import { tagHandler, ShakingHandler } from '../../events';
import { app,Tags } from './enigmaBase'
export class FillingCircleView extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.tagHandler = tagHandler(() => { });
		this.tagHandler.addTagHandler(Tags.coeur, () => {
				this.tagHandler.stop();
				app.next();
		});
	}
	componentWillUnmount() {

	}
	render() {
		return (
			<View>
			</View>
		);
	}
}
