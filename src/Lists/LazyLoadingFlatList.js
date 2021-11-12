import React, { Component } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

import LazyLoader from './LazyLoader';

import AuthManager from '../Utils/AuthManager';

export default class LazyLoadingFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      isInitialLoading: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  _renderFooter() {
    if (!this.state.isInitialLoading && !this.props.ListFooterComponent) {
      return null;
    }
    if (!this.state.isInitialLoading && this.props.ListFooterComponent) {
      return this.props.ListFooterComponent();
    }
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  refresh() {
    if (!this.state.isInitialLoading) {
      this.lazyLoader._refresh();
    }
  }

  lazyLoader() {
    return this.lazyLoader;
  }

  render() {
    return (
      <LazyLoader
        mode={this.props.mode}
        ref={(lazyLoader) => (this.lazyLoader = lazyLoader)}
        endpoint={this.state.endpoint}
        headers={AuthManager.getHeaders()}
        params={this.props.params}
        onItemsUpdated={(items) => {
          this.setState({ data: items, isInitialLoading: false });
        }}
        onRefresh={() => {
          this.setState({ data: [], isInitialLoading: true });
        }}
      >
        <FlatList
          {...this.state}
          data={this.state.data}
          ListFooterComponent={this._renderFooter()}
          contentContainerStyle={this.props.contentContainerStyle}
        />
      </LazyLoader>
    );
  }
}

LazyLoadingFlatList.defaultProps = {
  isChecked: false,
  mode: 'cursor',
  contentContainerStyle: {
    paddingBottom: 200,
  },
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 10,
  },
  loadingView: {
    padding: 20,
  },
});
