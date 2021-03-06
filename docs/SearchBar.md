![SearchField](https://user-images.githubusercontent.com/22890658/147465679-23918026-8671-4d62-b687-595f81ffb2f5.gif)

## SearchField

This component uses react-native-elements search bar. See https://reactnativeelements.com/docs/searchbar for additional props.

## Usage (Basic)

```js
import { SearchField } from 'react-native-mosaic';

<SearchField
  containerStyle={{ marginLeft: 20, marginRight: 20 }}
  placeholder="Search"
  searchIcon="search"
  onChangeText={(searchTerm) => {
    this.setState({ searchTerm });
  }}
/>;
```

## Props Available

| Prop                     | Type     | Description                                                                                                                                                                      |
| ------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `searchTerm`             | `string` | The string to be searched.                                                                                                                                                       |
| `throttle?`              | `bool`   | If this prop is set to true the input while wait a period of time after the user has stopped typing. If false the onChangeText will trigger immediately. Default is set to true. |
| `containerStyle`         | `style`  | Base style for container.                                                                                                                                                        |
| `inputContainerStyle`    | `style`  | Base style for the input container.                                                                                                                                              |
| `leftIconContainerStyle` | `style`  | Style for the left icon view.                                                                                                                                                    |
| `inputStyle`             | `style`  | Style for the input view.                                                                                                                                                        |
| `searchIcon`             | `string` | This props allows to override the Icon props or use a custom component.                                                                                                          |
| `placeholder`            | `string` | Set the placeholder text.                                                                                                                                                        |
| `borderColor`            | `string` | Set the border color when the input is focused.                                                                                                                                  |
