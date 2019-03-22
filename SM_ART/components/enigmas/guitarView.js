import React, {
	Component,
} from 'react';
import { Image, View, StyleSheet,Dimensions } from 'react-native'
import {ShakingHandler} from '../../events';
import {app,Tags,TagsHandler} from './enigmaBase';
import {InterView} from './interView';
import {play_sound,stop_sound} from '../../communications';
var { height, width } = Dimensions.get('window');
export class GuitarView extends Component {
	constructor(props) {
		super(props)
		this.state = {printBack:false}
	}
	componentDidMount()
	{
		this.state = { printBack: false }
		TagsHandler.addTagHandler(Tags.guitare,()=>{
			this.setState({printBack:true});
			TagsHandler.removeTagHandler(Tags.guitare);
			//Avant 5
			this.shakingHandler = ShakingHandler(1,18,()=>
			{
				//play_sound("BambinoCut");
			},
			()=>
			{
				//stop_sound("BambinoCut");
			},()=>{
				this.shakingHandler.stop();
				app.next()
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
