import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { orientationAngle } from 'react-native-orientation-angle'

const intervalList = [100, 500, 1000]

export default function App() {
  const [interval, setInterval] = useState(0)
  const [result, setResult] = useState({ pitch: 0, roll: 0, yaw: 0 })

  useEffect(() => {
    orientationAngle.getUpdateInterval((value) => {
      setInterval(value)
    })
  }, [])

  const changeInterval = (value: number) => {
    orientationAngle.setUpdateInterval(value)
    setInterval(value)
  }

  const subscribe = () => {
    orientationAngle.subscribe(setResult)
  }

  const unsubscribe = () => {
    orientationAngle.unsubscribe()
  }

  const renderValue = (label: string, value: string) => (
    <View style={styles.box}>
      <Text style={styles.boxLabel}>{label}:</Text>
      <Text>{value}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.intervalText}>Update Interval: {interval}ms</Text>

      {renderValue('pitch', result.pitch.toFixed(2))}
      {renderValue('roll', result.roll.toFixed(2))}
      {renderValue('yaw', result.yaw.toFixed(2))}

      <View style={styles.buttonWrapper}>
        {intervalList.map((value) => (
          <TouchableOpacity key={value} style={styles.button} onPress={() => changeInterval(value)}>
            <Text>{value}ms</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={subscribe}>
          <Text style={styles.buttonText}>Subscribe</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={unsubscribe}>
          <Text style={styles.buttonText}>Unsubscribe</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  intervalText: {
    fontSize: 16,
    marginBottom: 18,
    opacity: 0.5,
  },
  box: {
    width: 100,
    flexDirection: 'row',
    marginBottom: 4,
  },
  boxLabel: {
    width: 50,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#a8a8a8',
  },
  buttonText: {
    fontSize: 18,
  },
})
