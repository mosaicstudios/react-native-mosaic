![Alt Text](https://drive.google.com/uc?export=view&id=1T7Ba_93Kz0AO3iqizBbQRgJwVJeYzv5P)

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

| Prop    | Type    | Description     |
| ------- | ------- | --------------- |
| `data?` | `array` | Array of urls . |
