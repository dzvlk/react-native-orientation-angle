import { NativeModules, NativeEventEmitter, EmitterSubscription } from 'react-native'
import { quaternionToEuler } from './utils/quaternionToEuler'

const { OrientationAngle } = NativeModules

const eventEmitter = new NativeEventEmitter(OrientationAngle)

type Callback = ({}: { pitch: number; roll: number; yaw: number }) => void

let subscription: EmitterSubscription | null = null

const orientationAngle = {
  subscribe(callback: Callback) {
    if (!subscription) {
      subscription = eventEmitter.addListener('OrientationAngle', (event) => {
        callback(quaternionToEuler(event))
      })
    } else {
      console.warn('Already subscribed')
    }
  },

  unsubscribe() {
    if (subscription) {
      subscription.remove()
      subscription = null
    } else {
      console.warn('Already unsubscribed')
    }
  },

  setUpdateInterval(interval: number) {
    OrientationAngle.setUpdateInterval(interval / 1000) // millisecond to second
  },

  getUpdateInterval(callback: (interval: number) => void) {
    OrientationAngle.getUpdateInterval((interval: number) => {
      callback(Math.round(interval * 1000)) // second to millisecond
    })
  },
}

export { orientationAngle }
