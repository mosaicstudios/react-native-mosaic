![Gallery2](https://user-images.githubusercontent.com/22890658/147465088-98a24bbc-b1c7-4fd2-99e4-e897e57566bc.gif)

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
