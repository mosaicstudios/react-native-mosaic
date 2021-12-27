![LoadingView](https://user-images.githubusercontent.com/22890658/147465223-507e0e9f-dea4-4521-97e7-1dbac9bbbbc7.gif)

## Loading View

## Usage (Basic)

```js
import { LoadingView } from 'react-native-mosaic';

<LoadingView isLoading={this.state.isLoading} />;
```

## Props Available

| Prop              | Type     | Description                                                          |
| ----------------- | -------- | -------------------------------------------------------------------- |
| `indicatorColor?` | `string` | Color of the activity indicator. Default value is 'white'..          |
| `isLoading`       | `bool`   | To display the loading view. Default value is 'false'.               |
| `size?`           | `string` | To set the size of the activity indicator. Default value is 'large'. |
