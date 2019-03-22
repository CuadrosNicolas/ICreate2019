/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, } from 'react-native';
import { BackgroundView } from './backgroundView';
import { LumenView } from './enigmas/lumenView';
import { GuitarView } from './enigmas/guitarView';
import { FillingCircleView } from './enigmas/fillingCircleView';
import { SwaperView } from './enigmas/swaperView';
import { BreathingView } from './enigmas/breathingView';
import {SoundView}   from './enigmas/soundView';
import { setApp } from './enigmas/enigmaBase';
import {load} from '../communications';


export class GameView extends Component {
	constructor(props) {
		load();
		super(props);
		setApp(this);
		this.seqView = [
			<BreathingView duration={3000}></BreathingView>,
			<SwaperView></SwaperView>,
			<LumenView></LumenView>,
			<GuitarView></GuitarView>,
			<FillingCircleView></FillingCircleView>,
			<SoundView></SoundView>,
		];
		this.state = { step: 0 };
	}
	next() {
		this.setState({ step: this.state.step + 1 });
	}
	end()
	{
		this.props.end();
	}
	nextTimed(duration) {
		this.seqView.splice(this.state.step+1, 0, <BreathingView duration={duration}></BreathingView>)
		this.setState({ step: this.state.step + 1 });
	}
	render() {
		return (
			<BackgroundView style={styles.container}>
				{this.seqView[this.state.step]}
			</BackgroundView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#323232',
	},
	headline: {
		fontSize: 30,
		textAlign: 'center',
		margin: 10,
		color: '#F5F5F5'
	},
});