
![AgreementInput](https://user-images.githubusercontent.com/22890658/147463266-efd32766-ca37-43bb-a0a2-eeba6ea4f3e8.gif)

## AgreementInput

This component is built using the dependency `@react-native-community/checkbox` https://github.com/react-native-checkbox/react-native-checkbox. Check out the repository to view the props additional props available for the checkbox element.

## Getting Started

**Note:** These steps must be followed on first use otherwise an error will be thrown. 'Invariant Violation: requireNativeComponent: "RNCCheckbox" was not found in the UIManager.'

`yarn add @react-native-community/checkbox`

or

`npm install @react-native-community/checkbox --save`

On iOS, install cocoapods:

`npx pod-install`

### Mostly automatic installation

From react-native >= 0.60 autolinking will take care of the link (on iOS and Android)

for react-native =< 0.59.X

`react-native link @react-native-community/checkbox`

## Usage

```js
import { AgreementInput } from 'react-native-mosaic';

<AgreementInput
  onValueChange={(value) => this.setState({ value })}
  termsUrl="https://mosaic.ie/terms"
  privacyUrl="https://mosaic.ie/privacy"
  fillColor="green"
  checkColor="white"
/>;
```

## Usage (Custom Url)

```js
import { AgreementInput } from 'react-native-mosaic';

<AgreementInput
  showCustom={(url) => alert('Custom url: ' + url)}
  title="Custom user agreement input"
  customUrl="https://mosaic.ie/"
  customTextStyle={{ color: 'blue' }}
  customText="Click Here to view custom url"
/>;
```

## Props Available

| Prop                         | Type     | Description                                                                                                       |
| ---------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `onValueChange?`             | `func`   | Will trigger when the user presses the checkbox. A boolean value will be returned.                                |
| `visible?`                   | `bool`   | To control if the component is rendered based on a state variable. Default is true.                               |
| `termsUrl?`                  | `string` | Shows the terms and conditions url.                                                                               |
| `showTerms?`                 | `func`   | Will trigger when termsUrl contains a string and is pressed by the user.                                          |
| `privacyUrl?`                | `string` | Shows the privacy url.                                                                                            |
| `showPrivacy?`               | `func`   | Will trigger when privacyUrl contains a string and is pressed by the user.                                        |
| `customUrl?`                 | `string` | Allows to show a custom url. Will be shown at the end of the text.                                                |
| `customText?`                | `string` | The custom text for a custom url. Defaults to 'CUSTOM TEXT' if a customUrl is provided but this prop is not used. |
| `showCustom?`                | `func`   | Will trigger when customUrl contains a string and is pressed by the user.                                         |
| `fillColor?`                 | `string` | Background color of the checkbox indicator.                                                                       |
| `tintColor?`                 | `string` | Border color around the checkbox input.                                                                           |
| `checkColor?`                | `string` | Checkmark color.                                                                                                  |
| `containerStyle?`            | `style`  | Base style for the container.                                                                                     |
| `checkboxContainer?`         | `style`  | Style for the container of checkbox input.                                                                        |
| `textContainer?`             | `style`  | Style for the container of text.                                                                                  |
| `textStyle?`                 | `style`  | Text style for the title text.                                                                                    |
| `boxType?`                   | `string` | The type of box to use. Defaults to 'circle'.                                                                     |
| `checkboxAnimationDuration?` | `number` | The animation that occurs when the checkbox value changes. Default value is 0.4                                   |
