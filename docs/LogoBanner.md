![Alt Text](https://drive.google.com/uc?export=view&id=14eMlHgxSHh6oc4d-9WVbkJYx17kVSQLt)

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
