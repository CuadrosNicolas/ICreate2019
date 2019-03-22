import React, {
	Component,
} from 'react';
import { Animated, View } from 'react-native'

export class InterView extends Component {
	state = {
		fadeAnim: new Animated.Value(1),  // Initial value for opacity: 0
		sizeAnim: new Animated.Value(100),
		continue: true
	}
	anim() {
		if (this.state.continue) {
			Animated.sequence([
				Animated.timing(                  // Animate over time
					this.state.fadeAnim,            // The animated value to drive
					{
						toValue: 0.4,                   // Animate to opacity: 1 (opaque)
						duration: 1000,              // Make it take a while
					}
				),
				Animated.timing(                  // Animate over time
					this.state.fadeAnim,            // The animated value to drive
					{
						toValue: 0.8,                   // Animate to opacity: 1 (opaque)
						duration: 1000,              // Make it take a while
					}
				)
			]).start(() => { this.anim() }); // start the sequence group
			Animated.sequence([
				Animated.timing(                  // Animate over time
					this.state.sizeAnim,            // The animated value to drive
					{
						toValue: 100,                   // Animate to opacity: 1 (opaque)
						duration: 1000,              // Make it take a while
					}
				),
				Animated.timing(                  // Animate over time
					this.state.sizeAnim,            // The animated value to drive
					{
						toValue: 50,                   // Animate to opacity: 1 (opaque)
						duration: 1000,              // Make it take a while
					}
				)
			]).start();
		} // start the sequence group
		// Starts the animation
	}
	componentDidMount() {
		this.anim()
	}
	componentWillUnmount = () => {
		this.state.continue = false;
	};

	render() {
		let { fadeAnim, sizeAnim } = this.state;

		return (
			<View style={{
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<Animated.Image                 // Special animatable View
					style={{
						...this.props.style,
						opacity: fadeAnim,
						width: sizeAnim,
						resizeMode: 'contain',
						alignItems: 'center',       // Bind opacity to animated value
						justifyContent: 'center'
					}}
					source={require("./inter.png")}
				>
				</Animated.Image>
			</View>
		);
	}
}