import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { orientationAngle } from 'react-native-orientation-angle'

export default function App() {
  const [result, setResult] = useState({ pitch: 0, roll: 0, yaw: 0 })

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
      {renderValue('pitch', result.pitch.toFixed(2))}
      {renderValue('roll', result.roll.toFixed(2))}
      {renderValue('yaw', result.yaw.toFixed(2))}

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
    flexDirection: 'row',
    justifyContent: 'space-around',
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
