import React, {
	Component,
} from 'react';
import { Animated ,View} from 'react-native'
import { app } from './enigmaBase';
import { setMessageHandler } from '../../communications';
import { play_sound, stop_sound, play_ambiance, stop_ambiance } from '../../communications';

export class BreathingView extends Component {
	/**
	 * 
	 * Vue permettant
	 */
	constructor(props)
	{
		super(props);
		this._ismounted = false;

	}
	state = {
		fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
		sizeAnim: new Animated.Value(0),
		continue:true
	}
	stop()
	{
		Animated.sequence([
			Animated.timing(                  // Animate over time
				this.state.sizeAnim,            // The animated value to drive
				{
					toValue: 0,                   // Animate to opacity: 1 (opaque)
					duration: 1000,              // Make it take a while
				}
			),
			Animated.timing(                  // Animate over time
				this.state.sizeAnim,            // The animated value to drive
				{
					toValue: 0,                   // Animate to opacity: 1 (opaque)
					duration: 1000,              // Make it take a while
				}
			)
		]).start(()=>{app.next()});
	}
	anim() {
		if(this.state.continue)
		{
		Animated.sequence([
			Animated.timing(                  // Animate over time
				this.state.fadeAnim,            // The animated value to drive
				{
					toValue: 0.7,                   // Animate to opacity: 1 (opaque)
					duration: 500,              // Make it take a while
				}
			),
			Animated.timing(                  // Animate over time
				this.state.fadeAnim,            // The animated value to drive
				{
					toValue: 1,                   // Animate to opacity: 1 (opaque)
					duration: 500,              // Make it take a while
				}
			)
		]).start(()=>{this.anim()}); // start the sequence group
		Animated.sequence([
			Animated.timing(                  // Animate over time
				this.state.sizeAnim,            // The animated value to drive
				{
					toValue: 100,                   // Animate to opacity: 1 (opaque)
					duration: 500,              // Make it take a while
				}
			),
			Animated.timing(                  // Animate over time
				this.state.sizeAnim,            // The animated value to drive
				{
					toValue: 50,                   // Animate to opacity: 1 (opaque)
					duration: 500,              // Make it take a while
				}
			)
		]).start();
	 } // start the sequence group
		// Starts the animation
	}
	componentDidMount() {
		this._ismounted = true;
		this.setState({
			fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
			sizeAnim: new Animated.Value(0),
			continue: true
		});
		if(this.props.sound){
			play_sound(this.props.sound);
			setMessageHandler(({data})=>{
				setTimeout(() => {stop_sound(this.props.sound);this.stop();}, parseInt(data)*1000 );
				setMessageHandler(()=>{});
			})
		}
		else if(this.props.duration)
		{
			setTimeout(() => this.stop(), this.props.duration);
		}
		Animated.parallel([
			Animated.timing(                  // Animate over time
				this.state.sizeAnim,            // The animated value to drive
				{
					toValue: 100,                   // Animate to opacity: 1 (opaque)
					duration: 500,              // Make it take a while
				}
			),
			Animated.timing(                  // Animate over time
				this.state.fadeAnim,            // The animated value to drive
				{
					toValue: 1,                   // Animate to opacity: 1 (opaque)
					duration: 500,              // Make it take a while
				}
			)
		]).start(() => { this.anim()});
	}
	componentWillUnmount = () => {
	  this.state.continue = false;
		this._ismounted = false;

	};

	render() {
		let { fadeAnim, sizeAnim } = this.state;

		return (
			<View style={{
				flex:1,
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
					<Animated.Image                 // Special animatable View
						style={{
							...this.props.style,
							opacity: fadeAnim,
							width: sizeAnim,
							height: sizeAnim,
							alignItems: 'center',       // Bind opacity to animated value
							justifyContent: 'center'
						}}
						source={require("./button.png")}
					>
					</Animated.Image>
			</View>
		);
	}
}