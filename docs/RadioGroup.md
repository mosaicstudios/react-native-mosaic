![Alt Text](https://drive.google.com/uc?export=view&id=13xdmSJSVawwOtyTH7aVP0pb_CI6sILQi)

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
| `inputContainerStyle?` | `style`  | Style for the radio group.                       |
| `checkBoxStyle?`       | `style`  | Style for the checkbox.                          |
| `checkedColor?`        | `string` | Color of the selected item. Default is 'green'.  |
| `checkedIcon?`         | `string` | Default checked icon. Default is 'dot-circle-o'. |
| `uncheckedIcon?`       | `string` | Default unchecked icon. Default is 'circle-o'.   |
