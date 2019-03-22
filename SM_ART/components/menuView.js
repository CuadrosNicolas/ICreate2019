import React, { Component } from 'react';
import { Button, StyleSheet, Text, View,TextInput,TouchableHighlight } from 'react-native';
import {GameView} from './gameView';
import {BackgroundView} from './backgroundView';
import {setIp, load} from '../communications'
import {Tags,setTags,loadTags,TagsHandler} from './enigmas/enigmaBase'
var actualTag = "";
export class MenuView extends Component {
	//Application first screen
	//Allow to access the configuration menu
	//Or to launch the game
	constructor(props) {
		super(props);
		this.state = {
			actualView: 0,
			visible: false,
			ip_text: "",
			actualTag: "",
			views: [<View></View>]
		}
	}
	componentDidMount()
	{
		//Preparing the tag handler
		this.tagHandler =TagsHandler;
		//Load the tags from the device
		loadTags();
		//Setup the interface
		this.setup();
	}
	setup()
	{
		//Each view correspond to a menu
		// 0 main menu
		// 1 Game
		// 2 server IP setup
		// 3 Tag setup menu
		// 4 tag assignation menu
		this.setState({
			views:
				[
					<View style={styles.container}>
						<Text style={styles.headline}>SM'ART</Text>
						<View style={styles.buttonViewStyle}>
							<Button style={styles.buttonStyle} onPress={() => this.setState({ actualView: 1 })} title="Lancer la partie"></Button>
							<Button style={styles.buttonStyle} onPress={() => this.setState({ actualView: 2 })} title="Options"></Button>
						</View>
					</View>,
					<GameView end={()=>{this.setState({actualView:0})}} ></GameView>,
					<View style={styles.container}>
						<Text style={styles.headline}>Configurations</Text>
						<View style={styles.buttonViewStyle}>
							<Button style={styles.buttonStyle} onPress={() => { this.setState({ actualView: 3 }) }} title="Serveur"></Button>
							<Button style={styles.buttonStyle} onPress={() => { this.setState({ actualView: 4 }) }} title="Tags"></Button>
							<Button style={styles.buttonStyle} onPress={() => this.setState({ actualView: 0 })} title="Retour"></Button>
						</View>
					</View>,
					<View style={styles.container}>
						<Text style={styles.headline}>Serveur IP</Text>
						<View style={styles.buttonViewStyle}>
							<TextInput style={{ height: 40, color: '#F5F5F5' }}
								placeholder="Adresse IP du serveur"
								onChangeText={(text) => this.setState({ ip_text: text })}
							/>
							<Button style={styles.buttonStyle} onPress={() => { this.setState({ actualView: 0 }); setIp(this.state.ip_text) }} title="Valider"></Button>
							<Button style={styles.buttonStyle} onPress={() => this.setState({ actualView: 0 })} title="Retour"></Button>
						</View>
					</View>,
					<View style={styles.container}>
						<Text style={styles.headline}>Tags</Text>
						<View style={styles.tagStyle}>
							{
								//List all tags and create a button from it
								Object.getOwnPropertyNames(Tags).map((l) => (
									<TouchableHighlight onPress={() => {
										//Add a NFC handler for the next menu
										//To assign a tag to the selected variable
										actualTag = l;
										this.tagHandler.setUnknownHandler((t) => {
											setTags(l, t.id);
											this.setState({ actualView: 4 });
											this.tagHandler.setUnknownHandler((t) => {
											})
										})
										this.setState({ actualView: 5 });
									}}>
										<Text style={styles.headline}>{l}</Text>
									</TouchableHighlight>
								))
							}
							<Button style={styles.buttonStyle} onPress={() => this.setState({ actualView: 2 })} title="Retour"></Button>
						</View>
					</View>,
					<View style={styles.container}>
						<Text style={styles.headline}>{actualTag}</Text>
						<Text style={styles.headline}>Scaner un tag pour effectuer l'association</Text>
						<Button style={styles.buttonStyle} onPress={() => { this.tagHandler.setUnknownHandler = () => { }; this.setState({ actualView: 4 }) }} title="Retour"></Button>
					</View>
				]
		});
	}
	componentWillUnmount()
	{
	}
	render() {
		return (
			<BackgroundView style={styles.container}>
				{this.state.views[this.state.actualView]}
			</BackgroundView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#323232',
		flexDirection : "column"
	},
	headline: {
		fontSize: 30,
		textAlign: 'center',
		margin: 10,
		color: '#F5F5F5'
	},
	tagStyle: {
		fontSize: 30,
		textAlign: 'center',
		margin: 10,
		color: '#F5F5F5',
		backgroundColor: '#757090',
	},
	buttonViewStyle : {
		flex: 1,
		flexDirection: "column",
	},
	buttonStyle: {
		flex: 1,
		flexDirection: "column",
		padding:100,
		marginTop: 10
	}
});