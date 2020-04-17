import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, Alert} from 'react-native';
import {
  Text,
  View,
  Button,
  Dialog,
  Colors,
  PanningProvider,
  RadioGroup,
  RadioButton,
  Switch,
  Constants,
} from 'react-native-ui-lib'; // eslint-disable-line

import {Icon} from 'react-native-elements';
class E extends Component {
  constructor(props) {
    super(props);
    this.SCROLL_TYPE = {
      NONE: 'none',
      VERTICAL: 'vertical',
      HORIZONTAL: 'horizontal',
    };
    this.pannableTitle = {title: 'This is a pannable header Dialog'};
    this.title = 'This is a Dialog';
    this.supportedOrientations = ['portrait', 'landscape'];
    this.state = {
      panDirection: PanningProvider.Directions.UP,
      position: 'center',
      scroll: this.SCROLL_TYPE.NONE,
      showHeader: true,
      isRounded: true,
      showDialog: false,
    };
  }
  renderContent = () => {
    const data = (
      <View marginT-20 marginH-20>
        <Text>nghia</Text>
      </View>
    );

    return data;
  };
  showDialog = () => {
    this.setState({showDialog: true});
  };
  hideDialog = () => {
    this.setState({showDialog: false});
  };
  getDialogKey = (height) => {
    const {position} = this.state;
    return `dialog-key-${position}-${height}`;
  };
  renderPannableHeader = (props) => {
    const {title} = props;
    return (
      <View>
        <View margin-20>
          <Text>{title}</Text>
        </View>
        <View height={1} bg-dark70 />
      </View>
    );
  };

  renderDialog = () => {
    const {
      showDialog,
      panDirection,
      position,
      scroll,
      showHeader,
      isRounded,
    } = this.state;
    const renderPannableHeader = showHeader
      ? this.renderPannableHeader
      : undefined;
    const height = scroll !== this.SCROLL_TYPE.NONE ? '70%' : '20%';

    return (
      <Dialog
        migrate
        useSafeArea
        key={this.getDialogKey(height)}
        top={position === 'top'}
        bottom={position === 'bottom'}
        height={height}
        width={'52%'}
        panDirection={panDirection}
        containerStyle={isRounded ? styles.roundedDialog : styles.dialog}
        visible={showDialog}
        onDismiss={this.hideDialog}
        // renderPannableHeader={renderPannableHeader}
        pannableHeaderProps={this.pannableTitle}
        //supportedOrientations={this.supportedOrientations}
      >
        <View>
          <View style={{backgroundColor: '#fff123'}}>
            <Text
              style={{
                color: '#fff',
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {' '}
              Hà Nội
            </Text>
          </View>
          <View height={2} bg-dark70 />

          <View row>
            <View flex-1 style={styles.shadown}>
              <View style={styles.statusIcon}></View>
              <View centerH style={{top: 5}}>
                <Text style={{color: '#fff123'}}>GOOD</Text>
              </View>
            </View>

            <View flex-2>
              <View row marginL-0>
                <Icon name="clock" type="evilicon" color="#517fa4" />
                <Text>10:30 02/04/2020</Text>
              </View>

              <View row>
                <View flex-1>
                  <View centerH style={{top: 10}}>
                    <Text
                      style={{
                        top: -10,
                        color: 'gray',
                        fontSize: 30,
                        fontWeight: 'bold',
                      }}>
                      5.78
                    </Text>
                    <Text style={{color: 'gray', top: -15, left: 5}}>PH </Text>
                  </View>
                </View>
                <View flex-1>
                  <View centerH style={{top: 10}}>
                    <Text
                      style={{
                        top: -10,
                        color: 'gray',
                        fontSize: 30,
                        fontWeight: 'bold',
                      }}>
                      5.78
                    </Text>
                    <Text style={{color: 'gray', top: -15, left: 5}}>DO </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Dialog>
    );
  };
  render() {
    return (
      <>
        <Button marginT-50 label={'Show dialog'} onPress={this.showDialog} />

        <View centerH style={styles.shadown}>
          <Text
            style={{top: -10, color: 'red', fontSize: 40, fontWeight: 'bold'}}>
            10
          </Text>
          <Text style={{top: -20}}>PH </Text>
        </View>

        {this.renderDialog()}
      </>
    );
  }
}

export default E;

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: Colors.white,
  },
  roundedDialog: {
    backgroundColor: Colors.white,
    marginBottom: Constants.isIphoneX ? 0 : 20,
    borderRadius: 12,

    borderBottomWidth: 5,
    borderBottomColor: '#fff123',
  },
  button: {
    margin: 5,
    alignSelf: 'flex-start',
  },
  verticalScroll: {
    marginTop: 20,
  },
  horizontalTextContainer: {
    alignSelf: 'center',
    position: 'absolute',
    top: 10,
  },
  statusIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#DD0000',
    borderRadius: 20,
    top: 5,

    alignSelf: 'center',
  },
  shadown: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
});
