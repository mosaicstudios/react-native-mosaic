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

| Prop              | Type     | Description                                                          |
| ----------------- | -------- | -------------------------------------------------------------------- |
| `indicatorColor?` | `string` | Color of the activity indicator. Default value is 'white'..          |
| `isLoading`       | `bool`   | To display the loading view. Default value is 'false'.               |
| `size?`           | `string` | To set the size of the activity indicator. Default value is 'large'. |
