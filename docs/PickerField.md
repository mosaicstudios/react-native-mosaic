![Alt Text](https://drive.google.com/uc?export=view&id=1NmjwnW4cWlL7WbdrlK-Mt-CJ1IXWhlsJ)

## PickerField

## Usage (Basic)

```js
import { PickerField } from 'react-native-mosaic';

<PickerField
  selectedItemValue={this.state.selected}
  items={[
    { label: 'Gaelic Football', value: 'gaelic football' },
    { label: 'Hurling', value: 'hurling' },
    { label: 'Rubgy', value: 'rugby' },
  ]}
  onValueChange={(selected) => {
    this.setState({ selected });
  }}
/>;
```

## Props Available

| Prop            | Type   | Description                                                                                   |
| --------------- | ------ | --------------------------------------------------------------------------------------------- |
| `onValueChange` | `func` | This function is called when the picker item changes. Returns the value from the items array. |

| `value` | `string` | Current selected item in the picker. |
| `items` | `array` | An array of items to display in the picker. |
| `pickerStyle?` | `style` | Style for the picker. |
| `pickerContainerStyle?` | `style` | The view containing the picker label. |
| `errorTextStyle?` | `style` | Style for the error text. Shown if isValid function returns false. |
| `containerStyle?` | `style` | Style for the outermost view container. |
| `placeholder?` | `string` | The placeholder label for the picker. Default is { label: 'Select an item'} |

## Instance Methods

| Method     | Params | Description                                                                                         |
| ---------- | ------ | --------------------------------------------------------------------------------------------------- |
| `isValid?` | `-`    | This function can be called to validate if the picker has a selected item. Returns a boolean value. |
