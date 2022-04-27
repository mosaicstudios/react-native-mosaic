![InlinePicker](https://user-images.githubusercontent.com/22890658/147465172-81d333db-c4b3-403e-8cb6-ae87a916b101.gif)

## Inline Picker

## Usage

```js
import { InLinePicker } from 'react-native-mosaic';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { label: 'First', value: '1' },
        { label: 'Second', value: '2' },
        { label: 'Third', value: '3' },
      ],
    };
  }

  render() {
    let { items, selectedItem } = this.state;
    return (
      <View style={styles.container}>
        <Text>Test</Text>
        <InLinePicker
          title="Choose one"
          items={items}
          onItemSelected={(selectedItem) => {
            this.setState({ selectedItem });
          }}
          selectedItem={selectedItem ? parseInt(selectedItem) : 1}
        />
      </View>
    );
  }
}
```

## Props Available

| Prop                    | Type     | Description                                                                                   |
| ----------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `onItemSelected`        | `func`   | This function is called when the picker item changes. Returns the value from the items array. |
| `items`                 | `array`  | An array of items to display in the picker.                                                   |
| `title?`                | `string` | The text displayed inline with the picker. Will show as undefined if not set.                 |
| `pickerStyle?`          | `style`  | Style for the picker.                                                                         |
| `selectedItemStyle?`    | `style`  | Style for the text label of the selected item.                                                |
| `pickerContainerStyle?` | `style`  | The view containing the picker label.                                                         |
| `titleTextStyle?`       | `style`  | Style for the title text.                                                                     |
| `containerStyle?`       | `style`  | Style for the outermost view container.                                                       |
| `placeholder?`          | `object` | The placeholder label for the picker. Default is { label: 'Select an item' }                  |
