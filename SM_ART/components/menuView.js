import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableHighlight,BackHandler } from 'react-native';
import { GameView } from './gameView';
import { BackgroundView } from './backgroundView';
import { setIp, load,getIp,stopall } from '../communications'
import { Tags, setTags, loadTags, TagsHandler } from './enigmas/enigmaBase'
import {isNFCEnabled} from '../events'
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
			views: [<View></View>]
		}
		this.last = null;
	}
	componentDidMount() {
		BackHandler.exitApp = () => { };

		//Preparing the tag handler
		this.tagHandler = TagsHandler;
		//Load the tags from the device
		loadTags();
		//Setup the interface
		this.setup();
	}
	setBack(num,callback=null)
	{
		BackHandler.removeEventListener('hardwareBackPress',this.last);
		this.last = () => {
			if(callback)
				callback();
			this.setState({ actualView: num });
		};
		BackHandler.addEventListener('hardwareBackPress',this.last);

	}
	removeBack()
	{
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}
	setup() {
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
							<View style={styles.but}>
								<Button style={styles.buttonStyle} onPress={() => { this.setState({ actualView: 1 }); this.setBack(0, () => stopall())}} title="Lancer la partie"></Button>
							</View>
							<View style={styles.but}>
								<Button style={styles.buttonStyle} onPress={() => { if(!isNFCEnabled())alert("Activer le NFC et redémarrer l'application avant de pouvoir modifier les options."); this.setState({ actualView: 2 }); this.setBack(0)}} title="Options"></Button>
							</View>
						</View>
					</View>,
					<GameView end={() => { this.setState({ actualView: 0 }) }} ></GameView>,
					<View style={styles.container}>
						<Text style={styles.headline}>Configurations</Text>
						<View style={styles.buttonViewStyle}>
							<View style={styles.but}>
								<Button style={styles.buttonStyle} onPress={() => { this.setState({ actualView: 3 }); this.setBack(2, () => { this.setBack(0) }) }} title="Serveur"></Button>
							</View>
							<View style={styles.but}>
								<Button style={styles.buttonStyle} onPress={() => { this.setState({ actualView: 4 }); this.setBack(2, () => { this.setBack(0) }) }} title="Tags"></Button>
							</View>
							<View style={styles.but}>
								<Button style={styles.buttonStyle} onPress={() => { this.setState({ actualView: 0 }); this.removeBack()}} title="Retour"></Button>
							</View>
						</View>
					</View>,
					<View style={styles.container}>
						<Text style={styles.headline}>Serveur IP</Text>
						<View style={styles.buttonViewStyle}>
							<TextInput style={{ height: 40, color: '#F5F5F5' }}
								placeholder="Adresse IP du serveur"
								placeholderTextColor='#F5F5F5'
								onChangeText={(text) => this.setState({ ip_text: text })}
							/>
							<View style={styles.but}>
								<Button style={styles.buttonStyle} onPress={() => { this.setState({ actualView: 2 }); this.setBack(0); setIp(this.state.ip_text) }} title="Valider"></Button>
							</View>
							<View style={styles.but}>
								<Button style={styles.buttonStyle} onPress={() => {this.setState({ actualView: 2 }); this.setBack(0);}} title="Retour"></Button>
							</View>
						</View>
					</View>,
					<View style={styles.container}>
						<Text style={styles.headline}>Tags</Text>
						<View style={styles.container}>
							{
								//List all tags and create a button from it
								Object.getOwnPropertyNames(Tags).map((l) => (
									<View style={styles.but}>
										<TouchableHighlight style={styles.tagStyle}  onPress={() => {
											//Add a NFC handler for the next menu
											//To assign a tag to the selected variable
											this.setState({actualTag : l },()=>{
												this.tagHandler.setUnknownHandler((t) => {
													setTags(l, t.id);
													this.setState({ actualView: 4 });
													this.tagHandler.setUnknownHandler((t) => {
													})
												});
												this.setState({actualView: 5});
												this.setBack(4,()=>{this.setBack(2)});
											});
										}}>
											<Text style={styles.tagText}>{l}</Text>
										</TouchableHighlight>
									</View>
								))
							}
							<View style={styles.but}>
								<Button style={styles.buttonStyle} onPress={() => this.setState({ actualView: 2 })} title="Retour"></Button>
							</View>
						</View>
					</View>,
					<View style={styles.container}>
						<Text style={styles.headline}>Scaner un tag pour effectuer l'association</Text>
						<Text style={styles.headline}>{this.state.actualTag}</Text>
						<Button style={styles.buttonStyle} onPress={() => { this.tagHandler.setUnknownHandler = () => { }; this.setState({ actualView: 4 }); this.setBack(2, () => { this.setBack(0)}); }} title="Retour"></Button>
					</View>
				]
		});
	}
	componentWillUnmount() {
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
		flexDirection: "column"
	},
	but: {
		fontSize: 10,
		padding: 5
	},
	headline: {
		fontSize: 30,
		textAlign: 'center',
		margin: 10,
		color: '#F5F5F5'
	},
	tagStyle: {
		backgroundColor: '#757090',
		borderRadius: 10,
		borderWidth: 1,
	},
	tagText: {
		fontSize: 20,
		textAlign: 'center',
		color: '#F5F5F5'
	},
	buttonViewStyle: {
		flex: 1,
		flexDirection: "column",
	},
	buttonStyle: {
		flex: 1,
		flexDirection: "column",
	}
});