![Alt Text](https://drive.google.com/uc?export=view&id=1YZTN4THLS6XM1EH526Bhyi4vpjWoAwDI)

## Gallery Screen 2

## Usage (Basic)

```js
import { Gallery2 } from 'react-native-mosaic';

render() {
  return <Gallery2 />;
}
```

## Props Available

| Prop                     | Type     | Description                                                                                         |
| ------------------------ | -------- | --------------------------------------------------------------------------------------------------- |
| `data?`                  | `array`  | Array of objects. Object structure {id: string, photo: string, title: string, avatar_url: string} . |
| `loadingIndicatorColor?` | `string` | Color of the loading indicator.                                                                     |
| `containerStyle?`        | `style`  | Base style for container.                                                                           |
| `avatarStyle?`           | `style`  | Style of the avatar image.                                                                          |
| `outerImageContainer?`   | `style`  | Style of the outer view container for the avatar image.                                             |
| `imageContainer?`        | `style`  | Style for the avatar image.                                                                         |
| `showAvatar?`            | `bool`   | Boolean value will control if the avatar image is rendered. Default value is true.                  |
| `itemContainer?`         | `style`  | .                                                                                                   |
