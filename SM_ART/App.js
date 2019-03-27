/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import {MenuView} from './components/menuView';
import { Immersive } from 'react-native-immersive';

type Props = {};

export default class App extends Component<Props> {
  constructor(props)
  {
    super(props);
  }
  render() {
    return (<View style={styles.container}>
      <MenuView></MenuView>
    </View>);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#323232',
    flexDirection: "column"
  },
  headline: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#F5F5F5'
  },
  valueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  valueValue: {
    width: 200,
    fontSize: 20
  },
  valueName: {
    width: 50,
    fontSize: 20,
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});