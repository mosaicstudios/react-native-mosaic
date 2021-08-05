![Alt Text](https://drive.google.com/uc?export=view&id=1m2re3nJLHzX47nbir-9Jg7kLpF5eNWLR)

## QuickModal

## Usage (Basic)

```js
import { QuickModal, Button } from 'react-native-mosaic';

<View style={styles.container}>
  <Button
    title="Show Modal"
    onPress={() => this.quickModal.show('Hello World!!!')}
  />
  <QuickModal ref={(quickModal) => (this.quickModal = quickModal)} />
</View>;
```

## API

| Prop                            | Type             | Description                                                                                                                                |
| ------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `duration?`                     | number           | Timing for the modal hide animation (in ms). Default is 1400.                                                                              |
| `modalPosition?`                | string           | To set the size of the activity indicator. Default value is 'large'. Default is 'bottom'.                                                  |
| animationIn?                    | string or object | Modal show animation. Default is 'fadeInUp'                                                                                                |
| animationOut                    | string or object | Modal hide animation. Default is 'fadeOutDown'                                                                                             |
| animationInTiming?              | number           | Timing for the modal show animation (in ms). Default is 200.                                                                               |
| animationOutTiming?             | number           | Timing for the modal hide animation (in ms)                                                                                                |
| avoidKeyboard?                  | bool             | Move the modal up if the keyboard is open                                                                                                  |
| coverScreen?                    | bool             | Will use RN `Modal` component to cover the entire screen wherever the modal is mounted in the component hierarchy                          |
| hasBackdrop?                    | bool             | Render the backdrop                                                                                                                        |
| backdropColor?                  | string           | The backdrop background color                                                                                                              |
| backdropOpacity?                | number           | The backdrop opacity when the modal is visible. Default is 0.                                                                              |
| backdropTransitionInTiming?     | number           | The backdrop show timing (in ms)                                                                                                           |
| backdropTransitionOutTiming?    | number           | The backdrop hide timing (in ms)                                                                                                           |
| customBackdrop?                 | node             | The custom backdrop element                                                                                                                |
| children                        | node             | The modal content                                                                                                                          |
| deviceHeight?                   | number           | Device height (useful on devices that can hide the navigation bar)                                                                         |
| deviceWidth?                    | number           | Device width (useful on devices that can hide the navigation bar)                                                                          |
| isVisible                       | bool             | Show the modal?                                                                                                                            |
| onBackButtonPress?              | func             | Called when the Android back button is pressed                                                                                             |
| onBackdropPress?                | func             | Called when the backdrop is pressed                                                                                                        |
| onModalWillHide?                | func             | Called before the modal hide animation begins                                                                                              |
| onModalHide?                    | func             | Called when the modal is completely hidden                                                                                                 |
| onModalWillShow?                | func             | Called before the modal show animation begins                                                                                              |
| onModalShow?                    | func             | Called when the modal is completely visible                                                                                                |
| onSwipeStart?                   | func             | Called when the swipe action started                                                                                                       |
| onSwipeMove?                    | func             | Called on each swipe event                                                                                                                 |
| onSwipeComplete?                | func             | Called when the `swipeThreshold` has been reached                                                                                          |
| onSwipeCancel?                  | func             | Called when the `swipeThreshold` has not been reached                                                                                      |
| panResponderThreshold?          | number           | The threshold for when the panResponder should pick up swipe events                                                                        |
| scrollOffset?                   | number           | When > 0, disables swipe-to-close, in order to implement scrollable content                                                                |
| scrollOffsetMax?                | number           | Used to implement overscroll feel when content is scrollable. See `/example` directory                                                     |
| scrollTo?                       | func             | Used to implement scrollable modal. See `/example` directory for reference on how to use it                                                |
| scrollHorizontal?               | bool             | Set to true if your scrollView is horizontal (for a correct scroll handling)                                                               |
| swipeThreshold?                 | number           | Swiping threshold that when reached calls `onSwipeComplete`                                                                                |
| swipeDirection?                 | string or array  | Defines the direction where the modal can be swiped. Can be 'up', 'down', 'left, or 'right', or a combination of them like `['up','down']` |
| useNativeDriver?                | bool             | Defines if animations should use native driver. Default is true.                                                                           |
| useNativeDriverForBackdrop?     | bool             | Defines if animations for backdrop should use native driver (to avoid flashing on android)                                                 |
| hideModalContentWhileAnimating? | bool             | Enhances the performance by hiding the modal content until the animations complete                                                         |
| propagateSwipe?                 | bool or func     | Allows swipe events to propagate to children components (eg a ScrollView inside a modal)                                                   |

## Instance Methods

| Method | Params   | Description                                           |
| ------ | -------- | ----------------------------------------------------- |
| `show` | `string` | To show the modal. Pass a string to display the text. |
