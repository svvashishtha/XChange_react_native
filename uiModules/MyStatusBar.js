import React from 'react';
import {
  StatusBar,
  View,
} from 'react-native';
import styles from '../DFiles/styles.js';
const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);


module.exports = MyStatusBar;
