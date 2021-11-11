![Alt Text](https://drive.google.com/uc?export=view&id=1NmjwnW4cWlL7WbdrlK-Mt-CJ1IXWhlsJ)

## PickerField

## Usage (Basic)

```js
import { PickerField } from 'react-native-mosaic';

<PickerField
  label={'Country'}
  value={this.state.selectedItem || 'Select An Option'}
  data={[
    {
      label: 'Select An Option',
      items: [
        { label: 'Developer', value: 'Developer' },
        { label: 'Designer', value: 'Designer' },
      ],
    },
  ]}
  textStyle={{
    color: '#52575C',
    fontSize: 15,
  }}
  container={{ marginVertical: 40 }}
  selectedValues={[this.state.selectedItem]}
  onValuesChange={(values) => this.setState({ selectedItem: values[0] })}
  setInitialValueOnShowIfNull={true}
/>;
```

## Props Available

| Prop             | Type   | Description                                                                                   |
| ---------------- | ------ | --------------------------------------------------------------------------------------------- |
| `onValuesChange` | `func` | This function is called when the picker item changes. Returns the value from the items array. |

| `value` | `string` | Current selected item in the picker. |
| `data` | `array` | An array of items to display in the picker. |
| `pickerStyle?` | `style` | Style for the picker. |

| `errorTextStyle?` | `style` | Style for the error text. Shown if isValid function returns false. |
| `containerStyle?` | `style` | Style for the outermost view container. |
| `doneTitle?` | `string` | String to show to close button for the picker. |
| `showArrow?` | `bool` | Boolean value to show a chevron arrow on the right of the picker |

## Instance Methods

| Method     | Params | Description                                                                                         |
| ---------- | ------ | --------------------------------------------------------------------------------------------------- |
| `isValid?` | `-`    | This function can be called to validate if the picker has a selected item. Returns a boolean value. |
