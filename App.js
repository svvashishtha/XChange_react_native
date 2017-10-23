/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { IconToggle,ThemeProvider,COLOR } from './node_modules/react-native-material-ui/src';
import { Toolbar } from './node_modules/react-native-material-ui';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import {
  Platform,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Picker,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './DFiles/styles.js';
import MyStatusBar from './uiModules/MyStatusBar.js';
import {urls,storageKeys} from './DFiles/constants.js';

const uiTheme = {
    palette: {
        primaryColor: '#3F51B5',
    },
    toolbar: {
        container: {
            marginTop:StatusBar.currentHeight,
            height: 50,
        },
    },
};
export default class App extends Component<{}> {
   state = {
    index: 0,
    routes: [
      { key: '1', title: 'Currency' },
      { key: '2', title: 'Mass' },
    ],
    convertFrom: null,
    convertTo:null,
    input2: 1,
    conversionRate1: 1,
    conversionRate2: 1,
    input1: 1,
    value1: 1,
    value2: 1,
    options : [],
    currencyRates: {},
    result: 1,
  };
_handleIndexChange = index => this.setState({ index });

 _renderTabHeader = props => <TabBar {...props}
                               style = {styles.tabbarStyle}
                               tabStyle={styles.tab}
                               labelStyle={styles.label}
                               indicatorStyle={styles.indicator}
                           />;

  _renderScene = ({ route }) => {
    switch (route.key) {
        case '1':

        return (
            <View
                state={this.state}
                style={styles.page1}>

                    <View style={styles.pickerContainer}>
                        <View style={styles.pickerBoundary}>
                            <Picker  style={styles.pickerStyle}
                                selectedValue={this.state.convertFrom}
                                mode='dialog'
                                onValueChange={ (itemValue, itemIndex) =>
                                    this.setState(function(prevState, props){
                                        var temp = prevState.value2
                                            * parseFloat(prevState.currencyRates[itemValue])
                                            / prevState.conversionRate2;

                                        return {convertFrom: itemValue ,
                                                conversionRate1: parseFloat(this.state.currencyRates[itemValue]) ,
                                                value1: temp,}
                                     }, () => {
                                            try {
                                                AsyncStorage.setItem(storageKeys.convertFrom , itemValue)
                                                AsyncStorage.setItem(storageKeys.conversionRate1, this.state.currencyRates[itemValue].toString());
                                                } catch (error) {
                                                    console.log('AsyncStorage error: ' + error.message);
                                                }
                                     }) }
                                     mode= 'dropdown'>
                                {this.state.options.map((item, index) => {
                                return (<Picker.Item label={item} value={item} key={index}/>)})}
                            </Picker>
                        </View>
                        <Icon.Button
                            name="compare-arrows"
                            backgroundColor="transparent"
                            color='#000000'
                            iconStyle={{marginRight:20, marginLeft:20}}
                        />
                        <View style={styles.pickerBoundary}>
                            <Picker  style={{flex:1,  marginRight:8 }}
                                selectedValue={this.state.convertTo}
                                onValueChange={ (itemValue, itemIndex) => this.setState(
                                    function(prevState, props){
                                        var temp = prevState.value1
                                        * prevState.conversionRate1
                                        / prevState.conversionRate2;
                                        return {convertTo: itemValue  ,
                                             conversionRate2: parseFloat(prevState.currencyRates[itemValue]),
                                            value2: temp}

                                        }, () => {
                                               try {
                                                   AsyncStorage.setItem(storageKeys.convertTo , itemValue)
                                                   AsyncStorage.setItem(storageKeys.conversionRate2, this.state.currencyRates[itemValue].toString());
                                                   } catch (error) {
                                                       console.log('AsyncStorage error: ' + error.message);
                                                   }
                                        }
                                    )
                                }
                                mode= 'dropdown'>
                                {this.state.options.map((item, index) => {
                                return (<Picker.Item label={item} value={item} key={index}/>)})}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.textInputStyle}
                        onChangeText={(input) =>this.setState(function(prevState, props){
                                    var ip = parseInt(input);
                                    if (isNaN(ip)) {
                                        ip = 0;
                                    }
                                    var temp = ip
                                    * prevState.conversionRate2
                                    / prevState.conversionRate1;
                                    return {input1: ip,
                                        value2 : temp,
                                        value1: ip,
                                    }
                                }
                            )
                        }
                        value= { this.state.value1.toString() }
                        defaultValue = ' '
                        keyboardType='numeric' />


                        <Text
                            style={styles.seperatorStyle}
                        >=</Text>
                        <TextInput style={styles.textInputStyle}
                        onChangeText={(input) =>this.setState(
                            function(prevState, props){

                                    var ip = parseFloat(input);
                                    if (isNaN(ip)) {
                                        ip = 0;
                                    }
                                    var temp = ip
                                    * prevState.conversionRate1
                                    / prevState.conversionRate2;

                                    return {
                                        input2:ip,
                                        value1 : temp,
                                        value2: ip,
                                    }
                                }
                            )
                        }
                        value= { this.state.value2.toString() }
                        defaultValue = ' '
                        keyboardType='numeric'/>
                    </View>
            </View>
        );
      case '2':

        return (

          <View
            state={this.state}
            style={styles.page2}>

                <Text> {this.state.convertFrom} </Text>
                <Text> {this.state.conversionRate1}</Text>
                <Text> {this.state.convertTo}</Text>
                <Text> {this.state.conversionRate2}</Text>
                <Text> value1 </Text>
                <Text> {this.state.value1}</Text>
                <Text> value2 </Text>
                <Text> {this.state.value2}</Text>

                <Text> input1 </Text>
                <Text> {this.state.input1}</Text>
                <Text> input2 </Text>
                <Text> {this.state.input2}</Text>
          </View>
        );

      default:
        return null;
    }
  };
  componentDidMount() {
      var count = 1;
      AsyncStorage.multiGet([storageKeys.currency_rates,
          storageKeys.convertTo,
          storageKeys.convertFrom,
          storageKeys.conversionRate1,
          storageKeys.conversionRate2 ], (err, stores) => {
         stores.map((result, i, store) => {
           // get at each store's key/value so you can work with it
           let keys = [];
           let rateObject = JSON.parse(store[0][1]);
           for(var k in rateObject) keys.push(k) ;

           this.setState({
               options: keys,
               currencyRates: rateObject,
               convertTo: store[1][1],
               convertFrom: store[2][1],
               conversionRate1: store[3][1],
               conversionRate2: store[4][1],
           })
           console.log("Storage callback:    "+count);
           count++;
           console.log('options: ' + this.state.options );
           console.log('currencyRates' + this.state.currencyRates);
           console.log('convertTo: '  + this.state.convertTo);
           console.log('convertFrom: ' + this.state.convertFrom);
           console.log('conversionRate1: ' + this.state.conversionRate1);
           console.log('conversionRate2: ' + this.state.conversionRate2);
          });
        });



    fetch(urls.currencyBaseUSD)
    .then(function(response) {
        let keys = []
        responseObj = JSON.parse(response._bodyText)
        responseObj.rates['USD'] = 1;


        for(var k in responseObj.rates) keys.push(k) ;
        var cr1 = responseObj.rates[this.state.convertFrom];
        var cr2 = responseObj.rates[this.state.convertTo];
        console.log('cr1: '+ cr1);
        console.log('cr2: '+ cr2);

        if (isNaN(cr1)) {
            cr1 = 1;
        }
        if (isNaN(cr2)) {
            cr2 = 1;
        }
        console.log("setting state from fetch calback");
        this.setState({
            options: keys,
            currencyRates: responseObj.rates,
            conversionRate1: cr1,
            conversionRate2: cr2,
        });
        AsyncStorage.setItem(storageKeys.currency_rates , JSON.stringify(responseObj.rates));
        console.log('options: ' + this.state.options );
        console.log('currencyRates' + this.state.currencyRates);
        console.log('convertTo: '  + this.state.convertTo);
        console.log('convertFrom: ' + this.state.convertFrom);
        console.log('conversionRate1: ' + this.state.conversionRate1);
        console.log('conversionRate2: ' + this.state.conversionRate2);
    }.bind(this))
    .catch(function (err) {
        console.log("error while executing request: " + err);
      });

      console.log("Making btc request" );
      fetch(urls.bitcoinpriceUsd)
      .then(function(response) {
            responseObj = JSON.parse(response._bodyText)
            var temp = this.state.options;
            temp.push('Bitcoin');
            var temp1 = this.state.currencyRates;
            temp1['Bitcoin'] = 1/responseObj.bpi.USD.rate_float;
            this.setState({
                options:temp,
                currencyRates: temp1,
            });
          AsyncStorage.setItem(storageKeys.currency_rates , JSON.stringify(responseObj.rates));
    }.bind(this))
      .catch(function (err) {
          console.log("error while executing request: " + err);
        });
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
      <View style={styles.container}>
        <MyStatusBar backgroundColor="#303F9F" barStyle="light-content" />
        <Toolbar centerElement="xChange" />
        <TabViewAnimated
                  style={styles.container}
                  navigationState={this.state}
                  renderScene={this._renderScene}
                  renderHeader={this._renderTabHeader}
                  onIndexChange={this._handleIndexChange}
        />
      </View>
      </ThemeProvider>
    );
  }
}
