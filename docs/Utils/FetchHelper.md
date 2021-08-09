## FetchHelper (Utility)

## Usage (Basic)

```js
import { FetchHelper } from 'react-native-mosaic';

static getTestPosts(){
    return FetchHelper.get('https://jsonplaceholder.typicode.com/posts')
  }
```

## Instance Methods

| Method         | Params                         |
| -------------- | ------------------------------ |
| `get`          | string, bool?                  |
| `getPaginated` | array, object, string?         |
| `post`         | string, object, bool, bool     |
| `patch`        | string, object, bool, bool     |
| `put`          | string, object, bool, bool     |
| `delete`       | string, object, bool           |
| `download`     | string, string, string, string |
