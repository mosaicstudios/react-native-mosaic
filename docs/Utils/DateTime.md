## Date Time (Utility)

## Usage (Basic)

```js
import { DateTime } from 'react-native-mosaic';

<Text>{DateTime.now()}</Text>;
```

## Instance Methods

| Method              | Params                                         | Description                                                                     |
| ------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------- |
| `format`            | date (string), format (string)                 | Convert date to formatted string.                                               |
| `isoString`         | date (string), format? (string)                | Convert date to iso string.                                                     |
| `createDateTime`    | date (string), time (string), format? (string) | Convert date string and time string to moment.                                  |
| `formatDateTime`    | date (string)                                  | Format datetime to 'Do MMM YYYY, h:mm a' format.                                |
| `displayDate`       | date (string)                                  | Format date to 'Do MMM YYYY' format.                                            |
| `displayDateNoYear` | date (string)                                  | Format date to 'Do MMM' format.                                                 |
| `displayTime`       | time (string)                                  | Format time to 'h:mm a' format.                                                 |
| `isSameDay`         | date (string)                                  | Check if two dates are the same. Returns a boolean value.                       |
| `isToday`           | date (string)                                  | Check if date is todays date. Returns a boolean value.                          |
| `isTomorrow`        | date (string)                                  | Get tomrrows date.                                                              |
| `timeSince`         | date (string)                                  | Show number of hours, minutes, and seconds since a time. Highest is '60+ mins'. |
