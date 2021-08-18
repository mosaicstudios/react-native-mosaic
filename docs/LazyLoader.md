## Lazy Loader

This component can be used with a scrollview or flatlist to lazy load data from a url.

## Props Available

| Prop              | Type     | Description                                                                                                                     |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `endpoint`        | `string` | The url data will be fetched from.                                                                                              |
| `mode`            | `string` | The pagination type. Default mode is 'cursor'. See all types available here: 'cursor', 'page', 'limit_offset', 'custom', 'off'. |
| `params?`         | `object` | Add parameters to the endpoint url.                                                                                             |
| `customParams?`   | `object` | Used to set the url parameters when mode is set to 'custom'.                                                                    |
| `headers?`        | `object` | Request headers to be applied when fetching the data.                                                                           |
| `onItemsUpdated?` | `func`   | .                                                                                                                               |
| `parseResponse?`  | `func`   | Used when 'custom' is as the mode to parse the response.                                                                        |
