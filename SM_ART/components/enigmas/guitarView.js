import React, {
	Component,
} from 'react';
import { Image, View, StyleSheet,Dimensions } from 'react-native'
import {ShakingHandler} from '../../events';
import {app,Tags,TagsHandler} from './enigmaBase';
import {InterView} from './interView';
import {play_sound,stop_sound, play_ambiance} from '../../communications';
var { height, width } = Dimensions.get('window');
export class GuitarView extends Component {
	constructor(props) {
		super(props)
		this.state = {printBack:false}
	}
	componentDidMount()
	{
		play_ambiance("ghost");
		this.state = { printBack: false }
		TagsHandler.addTagHandler(Tags.guitare,()=>{
			stop_ambiance("ghost");
			this.setState({printBack:true});
			TagsHandler.removeTagHandler(Tags.guitare);
			this.shakingHandler = ShakingHandler(7,18,()=>
			{
				play_sound("bambino");
			},
			()=>
			{
				stop_sound("bambino");
			},()=>{
				this.shakingHandler.stop();
				app.nextSound("enigme2")
			});
		});
	}
	componentWillUnmount()
	{

	}
	render() {
		let back;
		if(this.state.printBack)
		{
			back = <Image style={{
				position:'absolute',
				width:width,
				height:height+50,
				resizeMode:'stretch'
			}}  source={require('./guitar_background.png')}/> ;
		}else
		{
			back = <InterView/>;
		}
		return (
			<View style={styles.container}>
				{
					back
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
