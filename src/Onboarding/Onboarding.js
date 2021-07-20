import React, { Component } from 'react';
import { Animated, View, StyleSheet, Dimensions, Button } from 'react-native';
const { width } = Dimensions.get('screen');

import IntroScrollerItem from './IntroScrollerItem';
import SlidingBorderIndicator from '../indicators/SlidingBorderIndicator';
import ScaleIndicator from '../indicators/ScaleIndicator';
import ExpandingIndicator from '../indicators/ExpandingIndicator';
import SlidingIndicator from '../indicators/SlidingIndicator';
import Backdrop from './Backdrop';
import Shape from './Shape';

export default class IntroScroller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: new Animated.Value(0),
      data: props.data,
      showPrevButton: props.showPrevButton,
      showNextButton: props.showNextButton,
      showDoneButton: props.showDoneButton,
      prevLabel: props.prevLabel,
      nextLabel: props.nextLabel,
      doneLabel: props.doneLabel,
      activeIndex: 0,
      backgroundShape: props.backgroundShape,
      backgroundShapeAnimation: props.backgroundShapeAnimation,
      singleBackgroundColor: props.singleBackgroundColor,
      indicatorType: props.indicatorType,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  _goToPrevious(index) {
    if (!this.list) {
      return;
    }
    if (index <= 0) {
      return;
    }
    this.list.scrollToIndex({ index: index - 1 });
  }

  _goToNext(index) {
    let { data } = this.state;
    if (!this.list) {
      return;
    }
    if (index === data.length - 1) {
      return;
    }
    this.list.scrollToIndex({ index: index + 1 });
  }

  _getBackgroundColors() {
    let { backgroundColors, data } = this.state;
    if (!backgroundColors) {
      var randomColor =
        '#' + (Math.random() * 0xffffff < 0).toString(16).padStart(6, '0');
      backgroundColors = [];
      data.map(() => {
        backgroundColors.push(randomColor);
      });
    }
    return backgroundColors;
  }

  _renderPrevButton() {
    let { activeIndex, showPrevButton } = this.state;
    if (activeIndex <= 0) {
      return <View />;
    }
    return showPrevButton ? (
      <Button
        onPress={() => this._goToPrevious(activeIndex)}
        title={this.state.prevLabel}
        color="white"
      />
    ) : (
      <View />
    );
  }

  _renderNextButton() {
    let { activeIndex, data, showNextButton } = this.state;
    if (activeIndex === data.length - 1) {
      return <View />;
    }
    return showNextButton ? (
      <Button
        onPress={() => this._goToNext(activeIndex)}
        title={this.state.nextLabel}
        color="white"
      />
    ) : (
      <View />
    );
  }

  _renderDoneButton() {
    let { activeIndex, data, showDoneButton } = this.state;
    if (activeIndex !== data.length - 1) {
      return null;
    }
    return showDoneButton ? (
      <Button
        onPress={() => this.props.onDonePressed()}
        title={this.state.doneLabel}
        color="white"
      />
    ) : null;
  }

  _renderIndicators() {
    let { indicatorType, scrollX, data } = this.state;
    switch (indicatorType) {
      case 'sliding':
        return (
          <SlidingIndicator
            data={data}
            scrollX={scrollX}
            activeDotColor="white"
            inActiveDotColor="white"
            inActiveDotOpacity={0.5}
            activeDotOpacity={1}
            dotSize={12}
            indicatorSpacing={10}
            containerStyle={this.props.indicatorContainerStyle}
            dotStyle={this.props.dotStyle}
            slidingIndicatorStyle={this.props.slidingIndicatorStyle}
          />
        );
      case 'slidingBorder':
        return (
          <SlidingBorderIndicator
            data={data}
            scrollX={scrollX}
            dotSize={40}
            borderPadding={0}
            activeDotColor="white"
            inActiveDotColor="white"
            slidingIndicatorColor="white"
            inActiveDotOpacity={0.5}
            activeDotOpacity={1}
            containerStyle={this.props.indicatorContainerStyle}
            dotStyle={this.props.dotStyle}
            dotContainerStyle={this.props.dotContainerStyle}
            slidingIndicatorStyle={this.props.slidingIndicatorStyle}
          />
        );
      case 'scale':
        return (
          <ScaleIndicator
            data={data}
            scrollX={scrollX}
            inActiveDotColor="white"
            activeDotColor="white"
            inActiveDotOpacity={0.5}
            activeDotScale={1.4}
            inactiveDotScale={0.8}
            containerStyle={this.props.indicatorContainerStyle}
            dotStyle={this.props.dotStyle}
          />
        );
      case 'expanding':
        return (
          <ExpandingIndicator
            data={data}
            scrollX={scrollX}
            activeDotColor={'white'}
            inActiveDotColor={'white'}
            inActiveDotOpacity={0.5}
            activeDotOpacity={1}
            expandingDotWidth={20}
            dotWidth={10}
            containerStyle={this.props.indicatorContainerStyle}
            dotStyle={this.props.dotStyle}
          />
        );
      default:
        return (
          <SlidingIndicator
            data={data}
            scrollX={scrollX}
            activeDotColor="white"
            inActiveDotColor="white"
            inActiveDotOpacity={0.5}
            activeDotOpacity={1}
            dotSize={12}
            indicatorSpacing={10}
            containerStyle={this.props.indicatorContainerStyle}
            dotStyle={this.props.dotStyle}
            slidingIndicatorStyle={this.props.slidingIndicatorStyle}
          />
        );
    }
  }
  render() {
    let { data, scrollX, backgroundShape, backgroundShapeAnimation } =
      this.state;
    return (
      <View style={styles.container}>
        <Backdrop
          singleBackgroundColor={this.props.singleBackgroundColor}
          backgroundColors={this._getBackgroundColors()}
          scrollX={scrollX}
        />
        {backgroundShape && (
          <Shape
            scrollX={scrollX}
            type={backgroundShape}
            useAnimation={backgroundShapeAnimation}
          />
        )}
        <Animated.FlatList
          ref={(list) => (this.list = list)}
          {...this.props}
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={32}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onMomentumScrollEnd={(event) => {
            const activeIndex = Math.round(
              event.nativeEvent.contentOffset.x / width
            );
            this.setState({ activeIndex });
          }}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item, index }) => {
            return (
              <IntroScrollerItem
                item={item}
                data={data}
                index={index}
                showPrevButton={this.state.showPrevButton}
                showNextButton={this.state.showNextButton}
                onPrevPressed={() => this._goToPrevious(index)}
                onNextPressed={() =>
                  this.list.scrollToIndex({ index: index + 1 })
                }
              />
            );
          }}
        />
        <View
          style={[styles.inputContainerStyle, this.props.inputContainerStyle]}
        >
          {this._renderPrevButton()}
          {this._renderNextButton()}
          {this._renderDoneButton()}
        </View>
        {this._renderIndicators()}
      </View>
    );
  }
}

IntroScroller.defaultProps = {
  indicatorType: 'sliding',
  data: [{}, {}],
  doneLabel: 'Done',
  nextLabel: 'Next',
  prevLabel: 'Back',
  onDonePressed: () => {},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainerStyle: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
