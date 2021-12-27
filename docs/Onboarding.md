![Onboarding](https://user-images.githubusercontent.com/22890658/147465395-5be62c3d-8dc0-44f8-96ab-f1c06ca50b2f.gif)

## Onboarding Screen

## Usage (Basic)

```js
const bgs = ['#A5BBFF', '#A0E5A5', '#C56551', '#FF947E'];

const DATA = [
  {
    id: 1,
    title: 'Multi-lateral intermediate moratorium',
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit vestibulum felis!',
    image: 'https://image.flaticon.com/icons/png/512/1864/1864475.png',
  },
  {
    id: 2,
    title: 'Automated radical data-warehouse',
    subtitle:
      'Phasellus quis turpis diam. Suspendisse potenti. Vivamus eu sem risus!',
    image: 'https://image.flaticon.com/icons/png/512/3069/3069172.png',
  },
  {
    id: 3,
    title: 'Inverse attitude-oriented system engine',
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit vestibulum felis!',
    image: 'https://image.flaticon.com/icons/png/512/616/616412.png',
  },
  {
    id: 4,
    title: 'Monitored global data-warehouse',
    subtitle: 'Phasellus quis turpis diam. Suspendisse potenti!',
    image: 'https://image.flaticon.com/icons/png/512/1864/1864589.png',
  },
];

import { Onboarding } from 'react-native-mosaic';

<Onboarding
  data={DATA}
  showPrevButton
  showNextButton
  showDoneButton
  backgroundShape="circle"
  backgroundShapeAnimation
  backgroundColors={bgs}
  onDonePressed={() => Alert.alert('Onboarding Complete', 'Congratulations!')}
/>;
```

## Props Available

| Prop                     | Type     | Description                                                                                             |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------- |
| `data?`                  | `array`  | Array of urls .                                                                                         |
| `backgroundColors?`      | `array`  | Array of colors.                                                                                        |
| `singleBackgroundColor?` | `string` | Single background color for the backdrop.                                                               |
| `backgroundShape?`       | `string` | Animated shape that animates on scroll. Currenty two shapes are supported 'circle' or 'square' .        |
| `indicatorType?`         | `string` | Choose an indicator type. Types 'sliding', 'slidingBorder', 'scale', 'expanding'. Default is 'sliding'. |
| `showPrevButton?`        | `bool`   | show the back button.                                                                                   |
| `prevLabel?`             | `string` | Title of the back button.                                                                               |
| `showNextButton?`        | `bool`   | show the next button.                                                                                   |
| `nextLabel?`             | `string` | Title of the next button.                                                                               |
| `showDoneButton?`        | `bool`   | show the done button.                                                                                   |
| `doneLabel?`             | `string` | Title of the done button.                                                                               |
