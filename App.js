import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {TabView,TabBar } from 'react-native-tab-view'
import converter from 'convert-units'
import Constants from 'expo-constants'


const measures = converter().measures()
const MeasureView = ({measure})=><Text>{measure}</Text>
const unCamelCase = (value) => value.replace(/([A-Z])/g, ' $1')
export default function App() {

  const [index, setIndex] = useState(0)
  const [routes] = useState(measures.map(m =>(
    { key : m, 
      title : unCamelCase(m)
    })))
  const renderScene = ({route}) => {
    return <MeasureView measure={route.key}/>
  }

  console.log(measures);
  return (
    <View style={[styles.container, {marginTop: Constants.statusBarHeight}]}>
      <Text style={styles.title}>Unit Converter</Text>
      <TabView
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar = { (props) => (
          <TabBar {...props} scrollEnabled tabStyle = {{width: 'auto'}}/>
        )}>
        
      </TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight:'bold',
    fontSize: 30,
    textAlign:'center',
    textTransform: 'uppercase'
  }
});
