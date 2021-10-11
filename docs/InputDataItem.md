## InputDataItem

This component can be used to render an inline component with a title label.

## Usage

```js
import { Switch, Platform } from 'react-native';
import { InputDataItem } from 'react-native-mosaic';

<InputDataItem
  containerStyle={{ marginTop: 30 }}
  textStyle={{ fontSize: 15 }}
  label="Make default card"
  inputView={() => (
    <Switch
      value={this.state.makeDefault}
      onValueChange={(makeDefault) => {
        this.setState({ makeDefault });
      }}
      thumbColor={'white'}
      trackColor={{ true: 'black', false: 'grey' }}
      thumbTintColor={Platform.OS == 'ios' ? null : 'lightgrey'}
      onTintColor={'black'}
    />
  )}
/>;
```

## Props Available

| Prop                  | Type     | Description                                     |
| --------------------- | -------- | ----------------------------------------------- |
| `containerStyle`      | `style?` | Main container style                            |
| `textStyle`           | `style?` | Text style for the label text                   |
| `inputContainerStyle` | `style?` | Container style for the input view              |
| `label`               | `string` | Label for the input view                        |
| `inputView`           | `func`   | Render function to render the inline input item |
