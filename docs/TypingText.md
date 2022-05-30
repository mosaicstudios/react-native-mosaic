![TypingText](https://user-images.githubusercontent.com/22890658/171034956-2f4f953e-fc88-40c3-9970-6058a8e62173.gif)

## TypingText

## Usage (Basic)

```js
import { TypingText } from 'react-native-mosaic';

<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
  <Text style={{ fontSize: 16 }}>This is mosaic, We </Text>
  <TypingText
    steps={['Design ✏️', 1000, 'Develop 🛠️', 1000, 'Maintain 💡', 1000]}
    loop={Infinity}
    blinkCursor={true}
    editDelay={100}
    deleteDelay={100}
    style={{ fontSize: 16, fontWeight: 'bold' }}
  />
</View>;
```

## Props Available

steps: ['Design', 1000, 'Develop', 1000, 'Maintain', 1000],
color: 'black',
blinkingCursor: true,
style: { fontSize: 14 },
editDelay: 80,
deleteDelay: 80,
blinkCursor: true,
blinkingCursorColor: 'black',

| Prop                   | Type     | Description                                                                                             |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `steps`                | `array`  | Steps which will be displayed and the duration on screen. Example ["string", 1000, "next string", 1000] |
| `loop?`                | `number` | The number of times the steps will repeat before stopping. Use Infinity to keep looping infinitely.     |
| `blinkCursor?`         | `bool`   | To show the blinking cursor                                                                             |
| `blinkingCursorColor?` | `color`  | The color of the blinking cursor.                                                                       |
| `editDelay?`           | `number` | The amount of time it will take to write the step on screen. Default is 80ms.                           |
| `deleteDelay?`         | `number` | The amount of time it will take to delete the step on screen. Default is 80ms.                          |
| `style`                | `style`  | Style for the typed text.                                                                               |
