import React,{
	Component,
} from 'react';
import {Animated} from 'react-native'
export class BackgroundView extends React.Component {
	state = {
		colorAnim: new Animated.Value(0.9),  // Initial value for opacity: 0
		continue : true
	}
	animLoop = () => {
		Animated.sequence([
			Animated.timing(                  // Animate over time
				this.state.colorAnim,            // The animated value to drive
				{
					toValue: 1,                   // Animate to opacity: 1 (opaque)
					duration: 1000,              // Make it take a while
				}
			),
			Animated.timing(                  // Animate over time
				this.state.colorAnim,            // The animated value to drive
				{
					toValue: 0.9,                   // Animate to opacity: 1 (opaque)
					duration: 1000,              // Make it take a while
				}
			)]).start(event => {
				if (event.finished && this.state.continue==true) {
					this.animLoop();
				}
			})
	}
	componentDidMount() {
		this.animLoop();
		// Starts the animation
	}
	componentWillUnmount()
	{
		this.setState({continue:false});
	}

	render() {
		let { colorAnim } = this.state;
		return (
			<Animated.View                 // Special animatable View
				style={{
					...this.props.style,
					opacity: colorAnim
				}}
			>
				{this.props.children}
			</Animated.View>
		);
	}
}