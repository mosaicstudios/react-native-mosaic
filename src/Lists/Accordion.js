import React, { Component } from 'react';
import {
  View,
  Alert,
  ScrollView,
  ViewPropTypes,
  Text,
  StyleSheet,
} from 'react-native';
import AuthManager from '../Utils/AuthManager';
import { Icon } from 'react-native-elements';
import LazyLoader from './LazyLoader';
import Accordion from 'react-native-collapsible/Accordion';

import PropTypes from 'prop-types';
export default class CollapsibleAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: props.sections,
      activeSections: props.activeSections,
      endpoint: props.endpoint,
    };
  }

  _setData(items) {
    if (this.props.isRefreshing) {
      this.props.isRefreshing(true);
    }
    this.setState({ sections: items, refreshing: false }, () => {
      if (this.props.isRefreshing) {
        this.props.isRefreshing(false);
      }
    });
  }

  _renderHeader(section, sectionIndex) {
    if (this.props.renderCustomHeader) {
      return this.props.renderCustomHeader(section, sectionIndex);
    }
    let { activeSections } = this.state;
    let index = activeSections.findIndex((item) => item == sectionIndex);
    let isActive = index > -1;
    let color = 'white';
    let iconName = isActive ? 'angle-up' : 'angle-down';
    if (isActive) {
      return (
        <View
          style={[
            styles.accordionHeaderContainer,
            this.props.accordionHeaderContainerStyle,
          ]}
        >
          <View
            style={[
              styles.accordionHeaderTitleContainer,
              this.props.accordionHeaderTitleContainerStyle,
            ]}
          >
            <Text
              style={[
                styles.accordionTitleText,
                this.props.accordionTitleTextStyle,
              ]}
            >
              {section.header}
            </Text>
            <Icon name={iconName} type="font-awesome" color={color} />
          </View>
        </View>
      );
    }
    return (
      <>
        <View
          style={[
            styles.accordionHeaderTitleContainer,
            this.props.accordionHeaderTitleContainerStyle,
          ]}
        >
          <Text
            style={[
              styles.accordionTitleText,
              this.props.accordionTitleTextStyle,
            ]}
          >
            {section.header}
          </Text>
          <Icon name={iconName} type="font-awesome" color={color} />
        </View>
      </>
    );
  }

  _renderContent(section, index) {
    if (this.props.renderCustomContent) {
      return this.props.renderCustomContent(section, index);
    }
    return (
      <View
        style={[
          styles.accordionContentContainer,
          this.props.accordionContentContainerStyle,
        ]}
      >
        <Text style={[styles.accordionText, this.props.accordionTextStyle]}>
          {section.content}
        </Text>
      </View>
    );
  }

  _renderAccordionList() {
    return (
      <Accordion
        {...this.props}
        sections={this.state.sections}
        underlayColor={this.props.underlayColor}
        renderAsFlatList={this.props.renderAsFlatList}
        sectionContainerStyle={[
          styles.sectionContainer,
          this.props.sectionContainerStyle,
        ]}
        activeSections={this.state.activeSections}
        renderHeader={(section, index) => this._renderHeader(section, index)}
        renderContent={(section, index) => this._renderContent(section, index)}
        onChange={(activeSections) => {
          if (this.props.onActiveChanged) {
            this.props.onActiveChanged(activeSections);
          }
          this.setState({ activeSections });
        }}
      />
    );
  }

  _renderLazyLoadingAccordion() {
    return (
      <LazyLoader
        ref={(lazyLoader) => (this.lazyLoader = lazyLoader)}
        endpoint={this.state.endpoint}
        headers={AuthManager.getHeaders()}
        params={this.props.params}
        onItemsUpdated={(items) => this._setData(items)}
      >
        {this._renderAccordionList()}
      </LazyLoader>
    );
  }

  _renderAccordion() {
    return this._renderAccordionList();
  }

  render() {
    if (this.props.lazyLoadingEnabled) {
      return this._renderLazyLoadingAccordion();
    } else {
      return this._renderAccordion();
    }
  }
}

CollapsibleAccordion.defaultProps = {
  lazyLoadingEnabled: false,
  renderAsFlatList: true,
  activeSections: [],
  underlayColor: 'transparent',
  endpoint: '',
  params: { objects: 'all' },
};

CollapsibleAccordion.propTypes = {
  /**
   * Required data array. Each object must contain header and content values unless using the custom render functions.
   */
  sections: PropTypes.array,

  /**
   * Enable/Disable lazy loading the accordion list.
   */
  lazyLoadingEnabled: PropTypes.bool,

  /**
   * Optional rendering as FlatList (defaults to true).
   */
  renderAsFlatList: PropTypes.bool,

  /**
   * Style props for accordion item header container
   */
  accordionHeaderContainerStyle: ViewPropTypes.style,

  /**
   * Style props for accordion item header title container
   */
  accordionHeaderTitleContainerStyle: ViewPropTypes.style,

  /**
   * Style props for accordion item header title text
   */
  accordionTitleTextStyle: Text.propTypes.style,

  /**
   * Render a custom header. section and sectionIndex are passed in the function.
   */
  renderCustomHeader: PropTypes.func,

  /**
   * Render a custom content container. section and sectionIndex are passed in the function.
   */
  renderCustomContent: PropTypes.func,

  /**
   * Style props for accordion section container
   */
  sectionContainerStyle: ViewPropTypes.style,

  /**
   * Style props for accordion item content container
   */
  accordionContentContainerStyle: ViewPropTypes.style,

  /**
   *  Style props for accordion item content title text
   */
  accordionTextStyle: Text.propTypes.style,

  /**
   *  Used with lazy loading to return a boolean if the list is refreshing.
   */
  isRefreshing: PropTypes.func,
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,
    padding: 0,
  },
  accordionHeaderContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'transparent',
  },
  accordionHeaderTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'gray',
  },
  accordionTitleText: {
    fontSize: 20,
    color: 'white',
  },
  accordionText: { fontSize: 18 },
  accordionContentContainer: {
    padding: 20,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: 'gray',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
