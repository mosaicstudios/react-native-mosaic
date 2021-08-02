![Alt Text](https://drive.google.com/uc?export=view&id=1Jy31C4-jnNg2rlwG4u8cpTB8dGnjcwMh)

## Scroll Indicators

## Usage

### ScaleIndicator

```js
import { ScaleIndicator } from 'react-native-mosaic';

<ScaleIndicator
  data={data}
  scrollX={this.state.scrollX}
  inActiveDotColor="black"
  activeDotColor="green"
  inActiveDotOpacity={0.5}
  activeDotScale={1.4}
  inactiveDotScale={0.8}
/>;
```

### SlidingBorderIndicator

```js
import { SlidingBorderIndicator } from 'react-native-mosaic';

<SlidingBorderIndicator
  data={data}
  scrollX={this.state.scrollX}
  dotSize={40}
  borderPadding={0}
  activeDotColor="orange"
  inActiveDotColor="black"
  slidingIndicatorColor="orange"
  inActiveDotOpacity={0.5}
  activeDotOpacity={1}
/>;
```

### SlidingIndicator

```js
import { SlidingIndicator } from 'react-native-mosaic';

<SlidingIndicator
  data={data}
  scrollX={this.state.scrollX}
  activeDotColor="blue"
  inActiveDotColor="gray"
  inActiveDotOpacity={0.5}
  activeDotOpacity={1}
  dotSize={12}
  indicatorSpacing={10}
/>;
```

### ExpandingIndicator

```js
import { ExpandingIndicator } from 'react-native-mosaic';

<ExpandingIndicator
  data={data}
  scrollX={this.state.scrollX}
  activeDotColor="red"
  inActiveDotColor="black"
  inActiveDotOpacity={0.5}
  activeDotOpacity={1}
  expandingDotWidth={20}
  dotWidth={10}
/>;
```

## API

| Prop                  | Type     | Description                                                                                                                   |
| --------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `scrollX?`            | `func`   | The horizontal position of the scrollView/FlatList currently being animated.                                                  |
| `data`                | `array`  | Used to render the number of dot indicators and to animate the scrolling. dots.                                               |
| `inActiveDotColor?`   | `string` | The color of the inactive indicator dots.                                                                                     |
| `data?`               | `array`  | The color of the inactive indicator dots.                                                                                     |
| `inActiveDotColor?`   | `string` | The color of the inactive indicator dots.                                                                                     |
| `activeDotColor?`     | `string` | The color of the active indicator dot.                                                                                        |
| `inActiveDotOpacity?` | `number` | The opacity of the inactive indicator dots. Default value is 1.                                                               |
| `activeDotOpacity?`   | `number` | The opacity of the active indicator dots. Default value is 1.                                                                 |
| `expandingDotWidth?`  | `number` | The width the active indicator dot expands to when changing to active/inactive. Default value is 20. ExpandingIndicator only. |
| `dotWidth?`           | `number` | The width of all inactive indicator dots. Default value is 10. ExpandingIndicator only.                                       |
| `containerStyle?`     | `style`  | The style of the main view container.                                                                                         |
| `dotStyle?`           | `style`  | The style of the dot indicators                                                                                               |
