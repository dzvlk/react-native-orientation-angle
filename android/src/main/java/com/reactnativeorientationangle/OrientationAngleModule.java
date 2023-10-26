package com.reactnativeorientationangle;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class OrientationAngleModule extends ReactContextBaseJavaModule implements SensorEventListener {
		private final ReactApplicationContext reactContext;
		private final SensorManager sensorManager;
		private final Sensor sensor;
		private double lastReading = (double) System.currentTimeMillis();
		private int interval = 100;
		private float[] quaternion = new float[4];

    public OrientationAngleModule(ReactApplicationContext reactContext) {
        super(reactContext);
				
				this.reactContext = reactContext;
				this.sensorManager = (SensorManager)reactContext.getSystemService(reactContext.SENSOR_SERVICE);
				this.sensor = this.sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR);
    }

    @Override
    @NonNull
    public String getName() {
        return "OrientationAngle";
    }

		@ReactMethod
		public void setUpdateInterval(int newInterval) {
				this.interval = newInterval;
		}
		
		@ReactMethod
		public void getUpdateInterval(Callback callBack) {
				callBack.invoke(this.interval);
		}

		@ReactMethod
		public void startUpdates() {
				this.sensorManager.registerListener(this, sensor, this.sensorManager.SENSOR_DELAY_FASTEST);
		}

		@ReactMethod
		public void stopUpdates() {
				this.sensorManager.unregisterListener(this);
		}

		@Override
		public void onSensorChanged(SensorEvent sensorEvent) {
				double tempMs = (double) System.currentTimeMillis();
				
				if (tempMs - this.lastReading >= this.interval) {
						this.lastReading = tempMs;
						
						WritableMap params = Arguments.createMap();

						SensorManager.getQuaternionFromVector(quaternion, sensorEvent.values);

						params.putDouble("w", quaternion[0]);
						params.putDouble("x", quaternion[1]);
						params.putDouble("y", quaternion[2]);
						params.putDouble("z", quaternion[3]);

						this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        			.emit("OrientationAngle", params);
				}
		}

		@Override
		public void onAccuracyChanged(Sensor sensor, int accuracy) {}
}
