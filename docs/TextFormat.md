## Text Format (Utility)

## Usage (Basic)

```js
import { TextFormat } from 'react-native-mosaic';

_getIndex(){
  let { array, selectedItem } = this.state

  let index = List.indexOf(array, selectedItem, 'id')

  return index
}
```

## Instance Methods

| Method             | Params | Description                                           |
| ------------------ | ------ | ----------------------------------------------------- |
| `capitalizeFirst`  | string | Capitalize the first letter of a string.              |
| `capitalizeCase`   | string | Capitalize the first letter of each word in a string. |
| `ellipsis`         | string | Add ellipsis to a string.                             |
| `numberWithCommas` | number | Add comma's to a value for example 1,234,456          |
