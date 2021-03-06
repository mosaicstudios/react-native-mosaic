![ProgressBar](https://user-images.githubusercontent.com/22890658/147476626-f73fd79c-8bd8-4187-98dd-5a0723ed115f.gif)

## Progress Bar

## Usage (Basic)

```js
import { ProgressBar } from 'react-native-mosaic';

render() {
  return (
    <View style={styles.container}>
      <ProgressBar ref={(progress) => (this.progress = progress)} />
        <Button
          title="Next"
          onPress={() => {
            this.progress.increaseProgress(20);
          }}
        />
        <Button
          title="Back"
          onPress={() => {
            this.progress.decreaseProgress(20);
          }}
        />
    </View>
  );
}
```

## Props Available

| Prop                | Type     | Description                                        |
| ------------------- | -------- | -------------------------------------------------- |
| `progressBarColor?` | `string` | Change the color of the progress bar.              |
| `containerStyle?`   | `style`  | Main style prop of the surrounding container view. |
| `progressBarStyle?` | `style`  | Style prop for the progress bar view.              |

## Instance Methods

| Method             | Params    | Description                                                                                                                      |
| ------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `currentProgress`  | `-`       | Returns the current progress of the bar as an integer.                                                                           |
| `decreaseProgress` | `integer` | This method takes an integer value. If passed 50 the progress bar will decrease by 50. Minimum value is 0. Maximum value is 100. |
| `increaseProgress` | `integer` | This method takes an integer value. If passed 50 the progress bar will increase by 50. Minimum value is 0. Maximum value is 100. |
