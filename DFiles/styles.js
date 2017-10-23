import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab:{
      backgroundColor: '#ffffff',
    },
    label:{
      color: '#000000',
    },
    indicator:
    {
   backgroundColor: '#FF4081',
    },
    tabbarStyle:{
      backgroundColor: '#ffffff',
      height: 53,
    },
    page1: {
      flex:1,
      backgroundColor: '#ffffff',

    },
    page2: {
      flex:1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
    },
  header:{
    height:36,
    justifyContent: 'center',
    margin:20,
  },
  content:{
    height: 36,
    justifyContent: 'center',
    marginLeft:20,
  },
  headerText:{
    color:'#000000',
    fontSize: 16,
  },
  contentText:{
    color:'#000000'
  },
  pickerContainer:{
    flexDirection: 'row',
    height:48,
    marginTop: 20,
    justifyContent:'center',
    alignItems: 'center',
  },
  pickerBoundary:{
    flex:1,
    margin:8,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#cccccc'
  },
  pickerStyle:{
    flex:1,
    marginRight:8
},
textInputStyle:{
    flex:1,
},
inputContainer:{
    flexDirection: 'row',
    height:36,
},
seperatorStyle:{
    marginRight:20,
    marginLeft:20,
    height:36,
    color:'black',
    textAlignVertical:'center',
    fontSize: 20,
},
});
module.exports = styles;
