![BackgroundCarousel](https://user-images.githubusercontent.com/22890658/147511739-14fa2329-6b81-4c05-a3cf-2b44771977b3.gif)

## BackgroundCarousel Screen

## Usage (Basic)

```js
const DATA = [
  {
    id: '',
    photo:
      'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
    title: 'Mindfulness',
    subtitle: 'Growth of your mindset',
    avatar_url: 'https://randomuser.me/api/portraits/women/20.jpg',
  },
  {
    id: '1',
    photo:
      'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
    title: 'Your Identity',
    subtitle: 'Say goodbye to procastination',
    avatar_url: 'https://randomuser.me/api/portraits/women/30.jpg',
  },
]

import { BackgroundCarousel } from 'react-native-mosaic';

render() {
  return <BackgroundCarousel
        data={this.state.data}
        backgroundColors={bgs}
        renderRightIcons={() => {
          return (
            <>
              <Icon
                name="grid"
                type="material-community"
                color={'black'}
                size={30}
                containerStyle={{ marginLeft: 20 }}
              />
              <Icon
                name="cog"
                type="material-community"
                color={'black'}
                size={30}
                containerStyle={{ marginLeft: 20 }}
              />
            </>
          );
        }}
      />
}
```

## Props Available

| Prop                | Type        | Description                                                                                                          |
| ------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| `data`              | `array`     | Array of objects. Object structure {id: string, photo: string, title: string, subtitle: string, avatar_url: string}. |
| `backgroundColors?` | `array`     | Array of colors. Should be the same length as the data prop.                                                         |
| `renderRightIcons?` | `Component` | A component prop to render right icon buttons.                                                                       |
