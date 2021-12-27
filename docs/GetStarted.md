![GetStarted](https://user-images.githubusercontent.com/22890658/147469115-25056ac9-c7d7-4785-be73-579dd570a7f6.gif)

## Get Started Screen

## Usage (Basic)

```js
import { GetStarted } from 'react-native-mosaic';

<GetStarted
  onItemChange={(item) => this.setState({ item })}
  onPress={() => Alert.alert('Connect with:', this.state.item.name)}
/>;
```

## Props Available

| Prop      | Type     | Description                                                                                                                 |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `colors?` | `object` | Colors is an object containing two values light and dark. This is the default object: { light: '#ffc873', dark: '#2D2D2D'}. |
| `data?`   | `array`  | An array of items to display in the list. Each object must contain two values name and icon.                                |
