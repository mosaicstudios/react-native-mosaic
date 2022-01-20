## Text Format (Utility)

## Usage (Basic)

```js
import { LocationFormat } from 'react-native-mosaic';

<Text>{LocationFormat.fullAddress(this.state.data)}</Text>;
```

## Instance Methods

| Method        | Params       | Description                                                                                                         |
| ------------- | ------------ | ------------------------------------------------------------------------------------------------------------------- |
| `fullAddress` | object, bool | Convert object to displayable string. Pass true as the second parameter to render each address value on a new line. |
| `getAddress`  | object       | Get address from object.                                                                                            |
