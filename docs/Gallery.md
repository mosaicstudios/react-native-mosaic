![Gallery](https://user-images.githubusercontent.com/22890658/147465038-1931fb15-b168-4fb7-bd6c-9d61408ea805.gif)

## Gallery Screen

## Usage (Basic)

```js
import { Gallery } from 'react-native-mosaic';

render() {
  return <Gallery />;
}
```

## Props Available

| Prop                     | Type     | Description                                                                        |
| ------------------------ | -------- | ---------------------------------------------------------------------------------- |
| `data?`                  | `array`  | Array of urls .                                                                    |
| `loadingIndicatorColor?` | `string` | Color of the loading indicator.                                                    |
| `containerStyle?`        | `style`  | Base style for container.                                                          |
| `avatarStyle?`           | `style`  | Style of the avatar image.                                                         |
| `outerImageContainer?`   | `style`  | Style of the outer view container for the avatar image.                            |
| `imageContainer?`        | `style`  | Style for the avatar image.                                                        |
| `showAvatar?`            | `bool`   | Boolean value will control if the avatar image is rendered. Default value is true. |
| `itemContainer?`         | `style`  | .                                                                                  |
