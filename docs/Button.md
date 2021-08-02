![Alt Text](https://drive.google.com/uc?export=view&id=1ci-R2nI_52PlqigEbQ14wzJbE39zDQ2o)

## Button

## Usage examples

```js
import { Button } from "react-native-mosaic";

// ...

<Button title="HELLO WORLD" />
<Button title="HELLO WORLD" type="outline" />
<Button title="HELLO WORLD" type="clear" />
<Button title="HELLO WORLD" isLoading />
<Button title="HELLO WORLD" isDisabled />
<Button
  title="HELLO WORLD"
  style={{ backgroundColor: 'lightblue' }}
  textStyle={{ color: 'black' }}
  onPress={() =>  console.log('PRESSED')}
/>
```

## API

| Prop | Type | Description |
|------|------|-------------|
| ``activityIndicatorColor?`` | ``string`` | Color of the activity indicator. Default value is 'gray' |
| ``isLoading`` | ``bool`` | To display a loading indicator. Default value is 'false'. |
| ``isDisabled`` | ``bool`` | To prevent user interaction. Reduces opacity to show the button is no longer pressable. Default value is 'false'. |
| ``title`` | ``string`` | To set the buttons title. Default value is 'large'. |
| ``type`` | ``enum`` | To set the buttons style. Default value is 'solid'. Options: 'solid', 'outline', 'clear'. |
| ``style`` | ``style`` | To style the main container of the button |
| ``textStyle`` | ``style`` | To style the title text of the button |
