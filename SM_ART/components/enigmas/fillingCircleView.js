import React, {
	Component,
} from 'react';
import { Image, View, StyleSheet,Animated } from 'react-native'
import { ShakingHandler } from '../../events';
import { app,Tags,TagsHandler } from './enigmaBase'
export class FillingCircleView extends Component {
	constructor(props) {
		super(props)
		this.state = { counter: 0, fadeAnim: new Animated.Value(0) }

	}
	next()
	{
		Animated.timing(                  // Animate over time
			this.state.fadeAnim,            // The animated value to drive
			{
				toValue: 0,                   // Animate to opacity: 1 (opaque)
				duration: 1000,              // Make it take a while
			}
		).start(() => {	app.nextTimed(5000);
		});
	}
	componentDidMount() {
		Animated.timing(                  // Animate over time
			this.state.fadeAnim,            // The animated value to drive
			{
				toValue: 1,                   // Animate to opacity: 1 (opaque)
				duration: 2000,              // Make it take a while
			}
		).start(()=>{
			this.tagHandler =TagsHandler;
			Object.getOwnPropertyNames(Tags).map(l=>{
				if(l.includes("chasse_"))
				{
					this.tagHandler.addTagHandler(Tags[l], () => {
						//this.tagHandler.removeTagHandler(Tags[l]);
						this.setState({ counter: this.state.counter + 1 });
						if (this.state.counter >= 4) {
							Object.getOwnPropertyNames(Tags).map(l => { this.tagHandler.removeTagHandler(Tags[l]);});
							this.next();
						}
					});
				}
			});
		});
	}
	componentWillUnmount() {
	}
	render() {
		let { fadeAnim} = this.state;
		list = [];
		for (i = 0; i < 4; i++) {
			if (i >= 4-this.state.counter) {

				list.push(<Animated.Image style={{margin: 20,width: 100,height: 100,opacity:fadeAnim}} source={require('./circle_base.png')}></Animated.Image>);
			}
			else {
				list.push(<Animated.Image style={{ margin: 20, width: 100, height: 100, opacity: fadeAnim }} source={require('./circle.png')}></Animated.Image>);
			}
		}
		return <View style={styles.container}>{list}</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#323232',
	},
	element : {
		margin: 20,
			width: 100,
			height: 100
	}
});