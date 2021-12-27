## Color (Utility)

## Usage (Example Lighten)

```js
import { Color } from 'react-native-mosaic';

let newColor = Color.shadeColor('#63C6FF', 40);
```

## Usage (Example Darken)

```js
import { Color } from 'react-native-mosaic';

let newColor = Color.shadeColor('#63C6FF', -40);
```

## Instance Methods

| Method       | Params          | Description                       |
| ------------ | --------------- | --------------------------------- |
| `shadeColor` | string, integer | brighten or darken any hex color. |
