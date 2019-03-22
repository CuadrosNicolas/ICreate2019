import React, {
	Component,
} from 'react';
import { Image, View, StyleSheet } from 'react-native'
import { lightHandler } from '../../events';
import { app } from './enigmaBase'
import {InterView} from './interView';
export class LumenView extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.lightHandler = lightHandler((light)=>{
			if(light>5){
				this.lightHandler.stop();
				app.next();
				lightHandler((light) => {});
			}
		});
	}
	componentWillUnmount() {

	}
	render() {
		return (
			<InterView>
			</InterView>
		);
	}
}
