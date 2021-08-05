![Alt Text](https://drive.google.com/uc?export=view&id=1aJD_oI8i7w9POREbghzWiG6yQ_aKAoFl)

## No Results

A view to render when a FlatList returns no results or an empty array.

## Usage

```js
import { NoResults } from 'react-native-mosaic';

<View style={styles.container}>
  <NoResults title="Hello World!" textStyle={{ fontSize: 14, color: 'blue' }} />
  <NoResults title="PRESS ME!" onPress={() => console.log('PRESSED')} />
</View>;
```

## Props Available

| Prop              | Type     | Description                                                            |
| ----------------- | -------- | ---------------------------------------------------------------------- |
| `title`           | `string` | Set the buttons title or text title.                                   |
| `onPress`         | `func`   | This is called when clicking button. Adding this will show the button. |
| `containerStyle?` | `style`  | Base style for container.                                              |
| `textStyle?`      | `style`  | Style for text title.                                                  |
