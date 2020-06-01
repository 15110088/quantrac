import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Dimensions,
  ScrollView,
  Picker,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  Keyboard,
  StatusBar,
  TouchableOpacity,
  TouchableHighlightBase,
  TouchableOpacityBase,
  TouchableHighlight,
} from 'react-native';

import * as theme from '../../constants/theme';

import * as Animatable from 'react-native-animatable';
import Loading from './../Loading';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {CheckBox} from '@ui-kitten/components';

import Animated, {Easing} from 'react-native-reanimated';
const {Value, timing} = Animated;

// Calculate window size
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class FillterTram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      keyword: '',
    };
    // animation values
    this._input_box_translate_x = new Value(width);
    this._back_button_opacity = new Value(0);
    this._content_translate_y = new Value(height);
    this._content_opacity = new Value(0);
  }

  _onFocus = () => {
    // update state
    this.setState({isFocused: true});
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };
    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    };

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };
    const content_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    };

    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start();
    timing(this._back_button_opacity, back_button_opacity_config).start();
    timing(this._content_translate_y, content_translate_y_config).start();
    timing(this._content_opacity, content_opacity_config).start();

    // force focus
    this.refs.input.focus();
  };

  _onBlur = () => {
    // update state
    this.setState({isFocused: false});
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: width,
      easing: Easing.inOut(Easing.ease),
    };
    const back_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: height,
      easing: Easing.inOut(Easing.ease),
    };
    const content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };

    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start();
    timing(this._back_button_opacity, back_button_opacity_config).start();
    timing(this._content_translate_y, content_translate_y_config).start();
    timing(this._content_opacity, content_opacity_config).start();

    // force blur
    this.refs.input.blur();
  };

  render() {
    return (
      <>
        <SafeAreaView style={styles.header_safe_area}>
          <View style={styles.header}>
            <View style={styles.header_inner}>
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor={"#ccd0d5"}
                            onPress={this._onFocus}
                            style={styles.search_icon_box}
                        >
                            <Entypo
                        name="water"
                        style={{position: 'absolute', marginLeft: 40, paddingTop: 10}}
                        size={32}
                        color="#4285F4"
                        />
                        </TouchableHighlight>
                        <Animated.View
                style={[ styles.input_box, {transform: [{translateX: this._input_box_translate_x}] } ]}
              >
                <Animated.View style={{opacity: this._back_button_opacity}}>
                  <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={"#ccd0d5"}
                    onPress={this._onBlur}
                    style={styles.back_icon_box}
                  >
                    <FontAwesome5 name="chevron-left" size={22} color="#000000" />
                  </TouchableHighlight>
                </Animated.View>
                <TextInput 
                  ref="input"
                  placeholder="Search Facebook"
                  clearButtonMode="always"
                  value={this.state.keyword}
                  onChangeText={(value) => this.setState({keyword: value}) }
                  style={styles.input}
                />
              </Animated.View>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default FillterTram;
const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000,
    backgroundColor:'red'
  },
  header: {
    height: 50,
    paddingHorizontal: 16,
  },
  header_inner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',

  },
  search_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#e4e6eb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_box: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    width: width - 32,
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#e4e6eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  content: {
    width: width,
    height: height,
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 999,
  },
  content_safe_area: {
    flex: 1,
    backgroundColor: 'white',
  },
  content_inner: {
    flex: 1,
    paddingTop: 50,
  },
  separator: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#e6e4eb',
  },
  image_placeholder_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '-50%',
  },
  image_placeholder: {
    width: 150,
    height: 113,
    alignSelf: 'center',
  },
  image_placeholder_text: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 5,
  },
  search_item: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e4eb',
    marginLeft: 16,
  },
  item_icon: {
    marginRight: 15,
  },
});
