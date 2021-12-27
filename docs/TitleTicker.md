![TitleTicker](https://user-images.githubusercontent.com/22890658/147465971-a03fc6ad-450a-4905-8098-0673157d10a9.gif)

## Title Ticker

## Usage (Basic)

### Get Started

To get the scrollX value use the animated component imported from react-native

```js
import { Animated } from 'react-native';

constructor(props) {
  super(props);
  this.state = {
    scrollX: new Animated.Value(0),
  }
}
```

```js
import { TitleTicker } from 'react-native-mosaic';

<TitleTicker data={this.state.data} scrollX={this.state.scrollX} />;
```

## Props Available

| Prop                  | Type    | Description                                                                  |
| --------------------- | ------- | ---------------------------------------------------------------------------- |
| `data?`               | `array` | Array of data to be displayed.                                               |
| `scrollX`             | `func`  | The horizontal position of the scrollView/FlatList currently being animated. |
| `titleContainerStyle` | `style` | This view is positioned absolute by default.                                 |
