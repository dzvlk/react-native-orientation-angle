# React Native Orientation Angle

[![npm version](https://badge.fury.io/js/react-native-orientation-angle.svg)](https://badge.fury.io/js/react-native-orientation-angle)

A React Native module that allows you to get device orientation angle

# Installation

```
yarn add react-native-orientation-angle

# RN >= 0.60
cd ios && pod install
```

# API

### `subscribe()`

Subscribe to device motion

```js
orientationAngle.subscribe((angles) => {
  console.log(angles) // { pitch: 0, roll: 0, yaw: 0 }
})
```

### `unsubscribe()`

Unsubscribe from device motion

```js
orientationAngle.unsubscribe()
```

### `setUpdateInterval()`

Set update interval in milliseconds (100, 200, 300)

```js
orientationAngle.setUpdateInterval(100) // milliseconds
```

### `getUpdateInterval()`

Get update interval in milliseconds

```js
orientationAngle.getUpdateInterval((milliseconds) => {
  console.log(milliseconds)
})
```

# Hook Usage

```js
import { useEffect } from 'react'
import { orientationAngle } from 'react-native-orientation-angle'

export const useOrientationAngle = () => {
  useEffect(() => {
    orientationAngle.setUpdateInterval(300)

    orientationAngle.subscribe((angles) => {
      console.log(angles)
    })

    return () => {
      orientationAngle.unsubscribe()
    }
  }, [])
}
```

## License

[MIT](LICENSE.md)
