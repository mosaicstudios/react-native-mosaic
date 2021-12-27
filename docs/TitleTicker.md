![TitleTicker](https://user-images.githubusercontent.com/22890658/147468294-0ce09640-38b3-4a49-acdd-ec6ab16084a7.gif)

## Title Ticker

## Usage (Basic)

### Get Started

To get the scrollX value use the animated component imported from react-native

```js
import { Animated } from 'react-native';

constructor(props) {
  super(props);
  this.state = {
    width,
    scrollX: new Animated.Value(0),
    data: ['Test 1', 'Test 2', 'Test 3'],
  }
}
```

```js
import { TitleTicker } from 'react-native-mosaic';

<View style={styles.container}>
  <TitleTicker data={this.state.data} scrollX={this.state.scrollX} />

  // Change to scrollY for vertical
  <Animated.FlatList
    horizontal
    pagingEnabled
    contentContainerStyle={{ marginTop: 200 }}
    data={this.state.data}
    onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
      { useNativeDriver: true }
    )}
    keyExtractor={(item) => item.id}
    renderItem={({ item, index }) => {
      return (
        <View style={{ height: 50, width: width - 40 }}>
          <Text>Test {index + 1}</Text>
        </View>
      );
    }}
  />
</View>
```

## Props Available

| Prop                  | Type    | Description                                                                  |
| --------------------- | ------- | ---------------------------------------------------------------------------- |
| `data?`               | `array` | Array of data to be displayed.                                               |
| `scrollX`             | `func`  | The horizontal position of the scrollView/FlatList currently being animated. |
| `titleContainerStyle` | `style` | This view is positioned absolute by default.                                 |
