type Data = {
  x: number
  y: number
  z: number
  w: number
}

export const quaternionToEuler = (data: Data) => {
  const ysqr = data.y * data.y
  const t0 = -2.0 * (ysqr + data.z * data.z) + 1.0
  const t1 = +2.0 * (data.x * data.y + data.w * data.z)
  let t2 = -2.0 * (data.x * data.z - data.w * data.y)
  const t3 = +2.0 * (data.y * data.z + data.w * data.x)
  const t4 = -2.0 * (data.x * data.x + ysqr) + 1.0

  t2 = t2 > 1.0 ? 1.0 : t2
  t2 = t2 < -1.0 ? -1.0 : t2

  const toDeg = 180 / Math.PI

  return {
    pitch: Math.atan2(t3, t4) * toDeg,
    roll: Math.asin(t2) * toDeg,
    yaw: Math.atan2(t1, t0) * toDeg,
  }
}
