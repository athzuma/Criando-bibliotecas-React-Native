import React from 'react';
import { StyleSheet, TouchableOpacity, Linking, Text } from 'react-native';

export default class SimpleLink extends React.Component {
  constructor(props){
    super(props);
  }

  open() {
    if (this.props.link == "" || this.props.link == undefined) {
      Linking.openURL(this.props.children);
    } else {
      Linking.openURL(this.props.link);
    }
    if (this.props.onPress !== undefined) {
      this.props.onPress();
    }
  }

  render() {
    const { onPress = null , children, style = {}, link = "", decorationNone = false } = this.props;
    return (
      <TouchableOpacity onPress={() => { this.open() }}>
        <Text
          style={
            [
              style,
              decorationNone ? {} : styles.link
            ]
          }
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  link: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
});
