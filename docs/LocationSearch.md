![LocationSearch](https://user-images.githubusercontent.com/22890658/147465258-1c5c6462-0be6-41c4-9f7e-ab9a17e033e0.gif)

## Check Box

## Usage (Basic)

```js
import { LocationSearch } from 'react-native-mosaic';

render() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <LocationSearch
          ref={(locationField) => (this.locationField = locationField)}
          gmapsKey="ENTER YOUR GMAPS KEY"
          onPlaceSelected={(data) => {
            this.setState({ data });
          }}
        />
      </ScrollView>
    </View>
  );
}
```

## Props Available

| Prop                         | Type     | Description                                                                                                                  |
| ---------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `gmapsKey`                   | `string` | GMaps key is required. See https://developers.google.com/maps/documentation/places/web-service/get-api-key/ to get your key. |
| `onPlaceSelected`            | `func`   | When an address is entered the full address will return.                                                                     |
| `underlineColor`             | `string` | Change the underline color of the the input.                                                                                 |
| `manualAddress?`             | `bool`   | Default is true. If set as false change to manual address button will not show.                                              |
| `showManualAddress?`         | `bool`   | Default is false. If set as true the manual address input fields will show.                                                  |
| `manualAddressOnly?`         | `bool`   | Default is false. If set as true autocomplete input will not show. Gmaps key is not required for this.                       |
| `showPostalCode?`            | `bool`   | Show postal code or zip code input field.                                                                                    |
| `showCountryPicker?`         | `bool`   | Show a country picker or simple text input. Default is true.                                                                 |
| `manualInputType?`           | `style`  | Style that will be passed to the style props of the manual React Native TextInput.                                           |
| `manualInputLabelStyle?`     | `style`  | Style that will be passed to the label text above the manual text fields.                                                    |
| `manualInputContainerStyle?` | `style`  | Styling for manual input component container.                                                                                |

## Instance Methods

| Method       | Params   | Description                                                                               |
| ------------ | -------- | ----------------------------------------------------------------------------------------- |
| `setAddress` | `object` | Pass the location object to set the address in the input.                                 |
| `isValid`    | `-`      | This can be called to validate the date or time. Will show an error if false is returned. |
