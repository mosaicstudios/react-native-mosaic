![Alt Text](https://drive.google.com/uc?export=view&id=1DGaGM7E4tK_X-meb4y2yL4fkttWMv41A)

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
            console.log('selectedItem', selectedItem);
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
