import React, {
	Component,
} from 'react';
import { Image, View, StyleSheet } from 'react-native'
import { lightHandler } from '../../events';
import { app } from './enigmaBase'
import {InterView} from './interView';
import { play_sound, stop_sound, play_ambiance, stop_ambiance } from '../../communications';

export class LumenView extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		play_ambiance("ghost")
		this.lightHandler = lightHandler((light)=>{
			if(light>10){
				stop_ambiance("ghost")
				this.lightHandler.stop();
				app.nextSound("intro");
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
