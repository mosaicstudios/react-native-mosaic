![Alt Text](https://drive.google.com/uc?export=view&id=1cTWGCpqT0jAK0WzRdFl72_N4y3FOpE1k)

## Segmented Control

## Usage (Basic)

```js
import { SegmentControl } from "react-native-mosaic";

// ...

<SegmentControl
  values={['Display', 'Manage']}
  onChange={(selectedIndex) => this.setState({ selectedIndex })}
/>
```

## API

| Prop | Type | Description |
|------|------|-------------|
| ``values`` | ``array`` | Segment values that are rendered on the view itself |
| ``disable`` | ``bool`` | To enable diable the segment control. Default value is `false`. |
| ``onChange`` | ``func`` | A callback function of segment index on change. Changed index is send on the callback as a param. |
| ``selectedIndex?`` | ``number`` | Index of the selected segment. |
| ``offsetHeight?`` | ``number`` | Active Segment's offset height. Basically a padding. |
| ``style?`` | ``style`` | Styles props of main container. |
| ``segmentControlStyle?`` | ``style`` | Styles props of segment control. |
| ``activeSegmentStyle?`` | ``style`` | Styles props of active segment. |
| ``selectedTextStyle?`` | ``style`` | Selected Segment text style. |
| ``unSelectedTextStyle?`` | ``style`` | Unselected Segment text style. |
