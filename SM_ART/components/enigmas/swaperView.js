import React, {
	Component,
} from 'react';
import { Animated,Image, View, Text,StyleSheet } from 'react-native'
import { play_sound, stop_sound, play_ambiance, stop_ambiance,setMessageHandler } from '../../communications';
import { gyroscopeHandler, lightHandler } from '../../events';
import { app,Tags,TagsHandler} from './enigmaBase'
export class SwaperView extends Component {
	constructor(props) {
		super(props)
		this.threshold = 5;
		this.solution = 2;
		this.previous = -1;
		this.state = {
			fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
			sizeAnim: new Animated.Value(150),
			posAnim: new Animated.Value(0),
			animInProgress:true,
			continue : false
		}
		this.picture = [require("./001-066.jpg"),require("./arton70.jpg"),
		require("./JBG.jpg"),
		require("./Jean-Philippe_Rameau_by_Jacques_Aved.jpg"),
		require("./Thomas_Gainsborough_024.jpg")];
		this.state.num = 0;
		this.state.actualPiture = this.picture[this.state.num];
		Animated.timing(
			this.state.fadeAnim,
			{
				toValue: 1,
				duration: 2000,
			}
		).start(()=>this.setState({animInProgress:false}));
	}
	componentDidMount() {
		this.gyroHandler = gyroscopeHandler((x, y, z) => {
			if (z > this.threshold) {
				this.left()
			}
			if (z < -this.threshold) {
				this.right();
			}
		});
		this.tagHandler = TagsHandler;
		this.tagHandler.addTagHandler(Tags.portrait, () => {
			try {
				this.gyroHandler.stop();
				this.tagHandler.removeTagHandler(Tags.portrait);
				this.lightHandler = lightHandler((light) => {
					if (light < 10 && this.state.continue == false) {
						this.setState({ continue: true });
						setTimeout(() => this.next(), 3000);
					}
					else if (light >= 10 && this.state.continue == true) {
						this.setState({ continue: false });
					}
				});
			}
			catch (e) {
				alert(e);
			}
		});
		this.setPicture();
	}
	setPicture()
	{
		this.setState({ actualPiture: this.picture[this.state.num] });
		if(this.previous>=0)
			stop_sound("auteur"+(this.previous+1));
		play_sound("auteur"+(this.state.num+1));
	}
	anim_right() {
		this.state.animInProgress = true;
		Animated.sequence([
			Animated.timing(
				this.state.posAnim,
				{
					toValue: 100,
					duration: 200,
				}
			)
		]).start(); 
		Animated.sequence([
			Animated.timing(
				this.state.sizeAnim,
				{
					toValue: 100,
					duration: 200,
				}
			)
		]).start();
		Animated.sequence([
			Animated.timing(                  
				this.state.fadeAnim,            
				{
					toValue: 0,
					duration: 200,
				}
			)
		]).start(() => {
			this.setState({
				fadeAnim: new Animated.Value(0),
				sizeAnim: new Animated.Value(150),
				posAnim: new Animated.Value(-100)
			});
			this.previous = this.state.num;
			this.state.num -= 1;
			if(this.state.num<0)
				this.state.num = this.picture.length-1;
			this.setPicture();

			Animated.sequence([
				Animated.timing(
					this.state.sizeAnim,            
					{
						toValue: 150,                   
						duration: 200,             
					}
				)
			]).start(); 
			Animated.sequence([
				Animated.timing(                  
					this.state.posAnim,            
					{
						toValue: 0,                   
						duration: 200,             
					}
				)
			]).start(); 
			Animated.sequence([
				Animated.timing(                  
					this.state.fadeAnim,            
					{
						toValue: 100,
						duration: 200,             
					}
				)
			]).start(()=>this.state.animInProgress=false); 
		}); 

	}
	anim_left()
	{
		this.state.animInProgress = true;
		Animated.sequence([
			Animated.timing(                  
				this.state.posAnim,            
				{
					toValue: -100,                   
					duration: 200,             
				}
			)
		]).start(); 
		Animated.sequence([
			Animated.timing(                  
				this.state.sizeAnim,            
				{
					toValue: 100,                   
					duration: 200,             
				}
			)
		]).start(); 
		Animated.sequence([
			Animated.timing(                  
				this.state.fadeAnim,            
				{
					toValue: 0,
					duration: 200,             
				}
			)
		]).start(()=>
		{
			this.previous = this.state.num;
			this.state.num += 1;
			if (this.state.num >= this.picture.length)
				this.state.num = 0;
			this.setPicture();

			this.setState({
				fadeAnim: new Animated.Value(0),
				sizeAnim: new Animated.Value(150),
				posAnim: new Animated.Value(100)
			});
			Animated.sequence([
				Animated.timing(                  
					this.state.posAnim,            
					{
						toValue: 0,                   
						duration: 200,             
					}
				)
			]).start(); 
			Animated.sequence([
				Animated.timing(                  
					this.state.sizeAnim,            
					{
						toValue: 150,                   
						duration: 200,             
					}
				)
			]).start(); 
			Animated.sequence([
				Animated.timing(                  
					this.state.fadeAnim,            
					{
						toValue: 1,                   
						duration: 200,             
					}
				)
			]).start(()=>this.state.animInProgress=false);
		});

	}
	left()
	{
		if(!this.state.animInProgress)
			this.anim_left();
	}
	right()
	{
		if (!this.state.animInProgress)
			this.anim_right();
	}
	next()
	{
		if(this.state.continue)
		{
			stop_sound("auteur" + (this.state.num + 1));
			if(this.state.num==this.solution)
			{
				play_sound("final_moins_bien");
				setMessageHandler(({ data }) => {
					setTimeout(() => { stop_sound("final_moins_bien"); app.end();}, parseInt(data) * 1000);
					setMessageHandler(() => { });
				})
			}
			else
			{
				play_sound("game_over");
				setMessageHandler(({ data }) => {
					setTimeout(() => { stop_sound("game_over"); app.end(); }, parseInt(data) * 1000);
					setMessageHandler(() => { });
				})
				//PREDU
			}
			this.lightHandler.stop();
		}
	}

	componentWillUnmount() {

	}
	render() {
		let {fadeAnim,sizeAnim,posAnim} = this.state;
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
						height: sizeAnim,
						resizeMode: 'contain',
						alignItems: 'center',       // Bind opacity to animated value
						justifyContent: 'center',
						transform: [
							{ translateX: posAnim },
						]

					}}

					source={this.state.actualPiture}
				>
				</Animated.Image>
			</View>
		);
	}
}
