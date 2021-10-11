## Text Format (Utility)

## Usage (Basic)

```js
import { TextFormat } from 'react-native-mosaic';

render(){
  return (
    <View>
      <Text>
        {TextFormat.numberWithCommas(1234567)} // 1,234,567
      </Text>
      <Text>
        {TextFormat.getInitials(user.first_name + ' ' + user.last_name)}
      </Text>
    </View>
  )
}
```

## Instance Methods

| Method             | Params | Description                                                      |
| ------------------ | ------ | ---------------------------------------------------------------- |
| `capitalizeFirst`  | string | Capitalize the first letter of a string.                         |
| `capitalizeCase`   | string | Capitalize the first letter of each word in a string.            |
| `ellipsis`         | string | Add ellipsis to a string.                                        |
| `numberWithCommas` | number | Add comma's to a value for example 1,234,456                     |
| `getInitials`      | string | Returns the first letter of every word passed into the function. |
