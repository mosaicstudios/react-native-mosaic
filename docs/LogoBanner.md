<img width="160" alt="LogoBanner" src="https://user-images.githubusercontent.com/22890658/147465307-71ec3aa3-f015-46c0-836a-f51a7abcb1ce.png">

## Logo Banner

Large center screen image to be used for app logo image, can also be used on splash screens.

Note: This will only work for local resources.

## Usage (Basic)

```js
import { LogoBanner } from 'react-native-mosaic';

render() {
    let image = require('../../assets/images/splash.png')
    return <LogoBanner image={image} />
  }

```

## Props Available

| Prop     | Type     | Description         |
| -------- | -------- | ------------------- |
| `style?` | `style`  | Base image style.   |
| `image`  | `string` | Source of the image |
