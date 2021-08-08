![Alt Text](https://drive.google.com/uc?export=view&id=1TiK9PpPtuVZLmqQZpFt2Lvv8PZ08kDTG)

## Title Ticker

## Usage (Basic)

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
