![TextField](https://user-images.githubusercontent.com/22890658/147465945-9f9fb328-73dd-4a60-ab86-743dad488e57.gif)

## TextField Input

## Usage (Basic)

```js
import { TextField } from 'react-native-mosaic';

<TextField
  ref={(tfFirstName) => (this.tfFirstName = tfFirstName)}
  value={this.state?.firstName}
  placeholder="First Name"
  onChangeText={(value) => {
    this.setState({ firstName: value });
  }}
/>;
```

## Props Available

| Prop                    | Type     | Description                                                                                                                 |
| ----------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `onChangeText`          | `func`   | A callback function which will pass back the value entered.                                                                 |
| `onChangePhoneNumber`   | `func`   | A callback function which will pass back the country code and the phone number entered.                                     |
| `placeholder?`          | `string` | To set a placeholder. Blank by default.                                                                                     |
| `value`                 | `string` | The value to display in the input.                                                                                          |
| `placeholderTextColor?` | `string` | Placeholder text color.                                                                                                     |
| `label?`                | `string` | Will display a text label. If not set a label will not show.                                                                |
| `type`                  | `string` | The type of input to display. Default is set to 'text'.                                                                     |
| `viewContainerStyle?`   | `style`  | Base style for container.                                                                                                   |
| `inputContainerStyle?`  | `style`  | Styling for Input Component Container.                                                                                      |
| `inputType?`            | `string` | Set a style type 'border' or 'underline'. Defaults to 'underline'.                                                          |
| `inputStyle?`           | `style`  | Style that will be passed to the style props of the React Native TextInput.                                                 |
| `labelStyle?`           | `style`  | Style that will be passed to the label text above the text field.                                                           |
| `errorStyle?`           | `style`  | Style for the error message when isValid function is triggered.                                                             |
| `phoneErrorStyle?`      | `style`  | Style for the phone error message when isValid function is triggered.                                                       |
| `phoneInputStyle?`      | `style`  | Style for the phone error message when isValid function is triggered.                                                       |
| `isDisabled?`           | `bool`   | Disables the input component.                                                                                               |
| `maxLength?`            | `number` | The maximum number of characters that can be entered.                                                                       |
| `multiline?`            | `bool`   | If true, the text input can be multiple lines. The default value is false.                                                  |
| `strictPassword?`       | `bool`   | Enforce strict password validation requiring an uppercase character, lowercase character, special character and one number. |

## Instance Methods

| Method     | Params | Description                                                                                         |
| ---------- | ------ | --------------------------------------------------------------------------------------------------- |
| `isValid?` | `-`    | This function can be called to validate if the picker has a selected item. Returns a boolean value. |
