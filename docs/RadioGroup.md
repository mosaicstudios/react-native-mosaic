![RadioGroup](https://user-images.githubusercontent.com/22890658/147465644-24f59381-d4ce-4c17-b080-2da650885b1a.gif)

## RadioGroup

## Setup

To use this component you need to install react-native-vector-icons. To see how to install please see https://github.com/oblador/react-native-vector-icons.

## Usage (Basic)

```js
import { RadioGroup } from 'react-native-mosaic';

<RadioGroup
  title={'Example Title'}
  data={[
    { label: 'First', value: '1' },
    { label: 'Second', value: '2' },
    { label: 'Third', value: '3' },
  ]}
  selectedValue={this.state.selectedValue}
  onItemSelected={(item) => this.setState({ selectedValue: item.value })}
/>;
```

## Props Available

| Prop                   | Type     | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `selectedValue`        | `string` | Current selected item of array.                  |
| `data`                 | `array`  | Array of objects to display in the group.        |
| `containerStyle?`      | `style`  | Base style for container.                        |
| `inputLabelStyle?`     | `style`  | Style for title label.                           |
| `inputContainerStyle?` | `style`  | Style for the radio group.                       |
| `checkBoxStyle?`       | `style`  | Style for the checkbox.                          |
| `checkedColor?`        | `string` | Color of the selected item. Default is 'green'.  |
| `checkedIcon?`         | `string` | Default checked icon. Default is 'dot-circle-o'. |
| `uncheckedIcon?`       | `string` | Default unchecked icon. Default is 'circle-o'.   |
