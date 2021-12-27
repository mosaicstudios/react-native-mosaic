
![Button](https://user-images.githubusercontent.com/22890658/147463298-250b4193-1ac5-4a9e-b1e7-25d698a6a3e5.gif)

## Button

This component is built using the dependency `react-native-button` https://github.com/APSL/react-native-button. Check out the repository to view the additional props available.

## Usage examples

```js
import { Button } from 'react-native-mosaic';

<View>
  <Button title="HELLO WORLD" />
  <Button title="HELLO WORLD" type="outline" />
  <Button title="HELLO WORLD" type="clear" />
  <Button title="HELLO WORLD" isLoading />
  <Button title="HELLO WORLD" isDisabled />
  <Button
    title="HELLO WORLD"
    style={{ backgroundColor: 'lightblue' }}
    textStyle={{ color: 'black' }}
    onPress={() => console.log('PRESSED')}
  />
</View>;
```

## Props Available

| Prop                      | Type     | Description                                                                                                       |
| ------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `activityIndicatorColor?` | `string` | Color of the activity indicator. Default value is 'gray'                                                          |
| `isLoading`               | `bool`   | To display a loading indicator. Default value is 'false'.                                                         |
| `isDisabled`              | `bool`   | To prevent user interaction. Reduces opacity to show the button is no longer pressable. Default value is 'false'. |
| `title`                   | `string` | To set the buttons title. Default value is 'large'.                                                               |
| `type`                    | `string` | To set the buttons style. Default value is 'solid'. Options: 'solid', 'outline', 'clear'.                         |
| `style`                   | `style`  | To style the main container of the button                                                                         |
| `textStyle`               | `style`  | To style the title text of the button                                                                             |
