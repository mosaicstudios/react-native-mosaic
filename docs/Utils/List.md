## List (Utility)

## Usage (Basic)

```js
import { List } from 'react-native-mosaic';

_getIndex(){
  let { array, selectedItem } = this.state

  let index = List.indexOf(array, selectedItem, 'id')

  return index
}
```

## Instance Methods

| Method            | Params                 | Description                                                                                                                      |
| ----------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `indexOf`         | array, object, string? | Return the index of the item. Key parameter is not required but can be used the get the index using and key from an object.      |
| `removeItem`      | array, object, string? | Will remove an item from an array. Key parameter is not required but can be used the get the index using and key from an object. |
| `deepClone`       | object                 | Clone an object so it is no longer immutable.                                                                                    |
| `findItemByValue` | array, Any, Any        | Returns an item from an array using the value passed.                                                                            |
| `getItemByValue`  | array, Any, Any        | Returns an item from an array using the value passed.                                                                            |
| `contains`        | array, object, string  | Returns a boolean value if the objct is found in the array.                                                                      |
| `findAndReplace`  | array, object          | Replaces an item in an array providing the ids match.                                                                            |
| `findAndRemove`   | array, object          | Removes an item in an array.                                                                                                     |
| `isNullOrEmpty`   | array                  | Returns a boolean value if the array is empty or not.                                                                            |
