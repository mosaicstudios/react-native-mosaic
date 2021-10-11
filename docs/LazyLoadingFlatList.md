## LazyLoadingFlatList

This component can be used to lazy load the results from any endpoint.

## Usage

```js
import { LazyLoadingFlatList } from 'react-native-mosaic';

<LazyLoadingFlatList
  endpoint={'https://jsonplaceholder.typicode.com/posts'}
  keyExtractor={(item, index) => index.toString() + item.id?.toString()}
  showsVerticalScrollIndicator={false}
  renderItem={({ item, index }) => {
    return (
      <View>
        <Text>{item.title}</Text>
      </View>
    );
  }}
/>;
```

## Props Available

| Prop                     | Type     | Description                                                                                                                     |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `endpoint`               | `string` | The url data will be fetched from.                                                                                              |
| `mode`                   | `string` | The pagination type. Default mode is 'cursor'. See all types available here: 'cursor', 'page', 'limit_offset', 'custom', 'off'. |
| `params?`                | `object` | Add parameters to the endpoint url.                                                                                             |
| `headers?`               | `object` | Request headers to be applied when fetching the data.                                                                           |
| `contentContainerStyle?` | `style`  | Style container for the contents of the list results.                                                                           |

## Instance Methods

| Method       | Params | Description                                        |
| ------------ | ------ | -------------------------------------------------- |
| `refresh`    | `func` | Manually refresh the list.                         |
| `lazyLoader` | `func` | Access the lazy loader props within the flat list. |
