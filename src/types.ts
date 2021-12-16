type Angle = {
  readonly pitch: number
  readonly roll: number
  readonly yaw: number
}

export type EventData = {
  readonly x: number
  readonly y: number
  readonly z: number
  readonly w: number
}

export interface IOrientationAngle {
  subscribe: (callback: (angle: Angle) => void) => void
  unsubscribe: () => void
  setUpdateInterval: (interval: number) => void
  getUpdateInterval: (callback: (interval: number) => void) => void
}
