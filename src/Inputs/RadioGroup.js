import React, { Component } from 'react';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements';

type Props = {};
export default class RadioGroup extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.selectedValue,
      data: props.data,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  _renderButtons() {
    let { data } = this.state;
    return data.map((item, index) => {
      return (
        <CheckBox
          title={item.label}
          checked={this.state.selectedValue === item.value}
          checkedIcon={this.props.checkedIcon}
          uncheckedIcon={this.props.uncheckedIcon}
          checkedColor={this.props.checkedColor}
          containerStyle={[styles.checkBox, this.props.checkBoxStyle]}
          onPress={() => this.props.onItemSelected(item)}
        />
      );
    });
  }

  render() {
    return (
      <View style={this.props.containerStyle}>
        {this.props.title && (
          <Text style={[styles.inputLabelStyle]}>{this.props.title}</Text>
        )}
        <View
          style={[styles.inputContainerStyle, this.props.inputContainerStyle]}
        >
          {this._renderButtons()}
        </View>
      </View>
    );
  }
}

RadioGroup.propTypes = {
  /**
   * Current selected item of array.
   */
  selectedValue: PropTypes.string.isRequired,

  /**
   * Array of objects to display in the group.
   */
  data: PropTypes.array.isRequired,

  /**
   * Base style for container.
   */
  containerStyle: ViewPropTypes.style,

  /**
   * Style for the radio group.
   */
  inputContainerStyle: ViewPropTypes.style,

  /**
   *  Style for the checkbox.
   */
  checkBoxStyle: ViewPropTypes.style,

  /**
   *  Color of the selected item.
   */
  checkedColor: PropTypes.string,

  /**
   *  Default checked icon
   */
  checkedIcon: PropTypes.string,

  /**
   *  Default unchecked icon
   */
  uncheckedIcon: PropTypes.string,
};

RadioGroup.defaultProps = {
  checkedColor: 'green',
  checkedIcon: 'dot-circle-o',
  uncheckedIcon: 'circle-o',
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  inputLabelStyle: {
    marginLeft: 10,
    fontSize: 15,
    marginTop: 20,
  },
  checkBox: { backgroundColor: 'transparent', borderWidth: 0, padding: 0 },
});
