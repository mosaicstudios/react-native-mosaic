![Alt Text](https://drive.google.com/uc?export=view&id=1hHE6bR4fbHBQnYQ8jdq4ac_iKbELi4Ve)

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

| Prop                             | Type    | Description                                                                                                       |
| -------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| `sections`                       | `array` | Required data array. Each object must contain header and content values unless using the custom render functions. |
| `lazyLoadingEnabled`             | `bool`  | Enable/Disable lazy loading the accordion list.                                                                   |
| `renderAsFlatList`               | `bool`  | Optional rendering as FlatList (defaults to true).                                                                |
| `accordionHeaderContainerStyle`  | `style` | Style props for accordion item header container                                                                   |
| `accordionTitleTextStyle`        | `style` | Style props for accordion item header title text                                                                  |
| `renderCustomHeader`             | `func`  | Render a custom header. section and sectionIndex are passed in the function.                                      |
| `renderCustomContent`            | `func`  | Render a custom content container. section and sectionIndex are passed in the function.                           |
| `sectionContainerStyle`          | `style` | Style props for accordion section container                                                                       |
| `accordionContentContainerStyle` | `style` | Style props for accordion item content container                                                                  |
| `accordionTextStyle`             | `style` | Style props for accordion item content title text.                                                                |
| `isRefreshing`                   | `func`  | Used with lazy loading to return a boolean if the list is refreshing.                                             |
