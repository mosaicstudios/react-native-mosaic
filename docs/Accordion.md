
![Accordion](https://user-images.githubusercontent.com/22890658/147463212-6aeedc62-1b4e-4c67-b35b-7b1010fd8db6.gif)

## Accordion

This component is built using the dependency `react-native-collapsible/Accordion` https://github.com/oblador/react-native-collapsible. Check out the repository to view the additional props available.

## Basic Usage

```js
import { Accordion } from 'react-native-mosaic';

let data = [
  {
    id: '1',
    header: 'Where can I find my settings?',
    content:
      "Anim pariatur cliche reprehenderit.",
  },
  {
    id: '2',
    header: 'What is the terms?',
    content:
      "Anim pariatur cliche reprehenderit.",
  },
  {
    id: '3',
    header: '  Where do I leave feedback?',
    content:
      "Anim pariatur cliche reprehenderit.",
  },
]

<Accordion
  sections={this.state.data}
/>
```

## Props Available

| Prop                              | Type     | Description                                                                                                       |
| --------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `sections`                        | `array`  | Required data array. Each object must contain header and content values unless using the custom render functions. |
| `lazyLoadingEnabled`              | `bool`   | Enable/Disable lazy loading the accordion list.                                                                   |
| `renderAsFlatList`                | `bool`   | Optional rendering as FlatList (defaults to true).                                                                |
| `headerContainerStyle`            | `style`  | Style props for accordion item header container                                                                   |
| `activeHeaderTitleContainerStyle` | `style`  | Style props for active accordion item header container                                                            |
| `headerTitleContainerStyle`       | `style`  | Style props for accordion item header title container                                                             |
| `titleTextStyle`                  | `style`  | Style props for accordion item header title text                                                                  |
| `activeTitleTextStyle`            | `style`  | Style props for active accordion item header title text                                                           |
| `renderCustomHeader`              | `func`   | Render a custom header. section and sectionIndex are passed in the function.                                      |
| `renderCustomContent`             | `func`   | Render a custom content container. section and sectionIndex are passed in the function.                           |
| `sectionContainerStyle`           | `style`  | Style props for accordion section container                                                                       |
| `contentContainerStyle`           | `style`  | Style props for accordion item content container                                                                  |
| `contentTextStyle`                | `style`  | Style props for accordion item content title text.                                                                |
| `isRefreshing`                    | `func`   | Used with lazy loading to return a boolean if the list is refreshing.                                             |
| `iconColor`                       | `string` | Color of the arrow icons.                                                                                         |
