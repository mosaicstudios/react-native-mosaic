![DatePicker](https://user-images.githubusercontent.com/22890658/147463092-7f5520a4-60f8-4187-a559-c9d56712ab60.gif)

## Date Picker

## Setup

Install the library and the community date/time picker using npm or yarn:

```bash
# using npm
$ npm i react-native-modal-datetime-picker @react-native-community/datetimepicker

# using yarn
$ yarn add react-native-modal-datetime-picker @react-native-community/datetimepicker
```

Please notice that the `@react-native-community/datetimepicker` package is a native module so [**it might require manual linking**](https://github.com/react-native-community/react-native-datetimepicker#getting-started).

## Usage

```js
import { DatePicker } from 'react-native-mosaic';

<DatePicker
  value={this.state.datetime}
  mode="datetime"
  onChange={(value) => console.log('DATETIME', value)}
/>;
```

## Props Available

Please see @react-native-community/datetimepicker for additional available props.

| Prop          | Type                                                   | Description                                                                                                                                                                                                            |
| ------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onChange`    | `func`                                                 | This is called when the user confirm the picked date or time in the UI. The first and only argument is a date or time string representing the new date and time formatted by moment.js with the given format property. |
| `isVisible`   | `bool`                                                 | Used to display the modal picker.                                                                                                                                                                                      |
| `date`        | <code>string &#124; date &#124; Moment instance</code> | Specify the display date of DatePicker. `string` type value must match the specified format                                                                                                                            |
| `mode`        | `enum`                                                 | The `enum` of `date`, `datetime` and `time`                                                                                                                                                                            |
| `minimumDate` | <code>string &#124; date</code>                        | Restricts the range of possible date values.                                                                                                                                                                           |
| `maximumDate` | <code>string &#124; date</code>                        | Restricts the range of possible date values.                                                                                                                                                                           |

### Property `customStyles` available keys

- appearance: `dateInput`, `disabled`, `dateTouchBody`, `dateIcon`, `placeholderText`, `dateText`
- ios select panel: `datePickerCon`, `datePicker`, `btnConfirm`, `btnTextConfirm`, `btnCancel`, `btnTextCancel`

## Instance Methods

| Method    | Params | Description                                                                               |
| --------- | ------ | ----------------------------------------------------------------------------------------- |
| `isValid` | `-`    | This can be called to validate the date or time. Will show an error if false is returned. |
