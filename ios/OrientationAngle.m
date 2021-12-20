// OrientationAngle.m
#import "OrientationAngle.h"
#import <React/RCTLog.h>

@implementation OrientationAngle
{
    CMMotionManager *_motionManager;
}

// To export a module named OrientationAngle
RCT_EXPORT_MODULE();

- ()init {
    if (self = [super init]) {
        _motionManager = [[CMMotionManager alloc] init];
        [_motionManager setDeviceMotionUpdateInterval:0.1];
    }
    
    return self;
}

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"OrientationAngle"];
}

// Will be called when this module's first listener is added.
- (void)startObserving {
    // Set up any upstream listeners or background tasks as necessary
    if (_motionManager.deviceMotionAvailable) {
        NSOperationQueue *queue = [[NSOperationQueue alloc] init];
        [_motionManager startDeviceMotionUpdatesToQueue:queue withHandler:^(CMDeviceMotion *motion, NSError *error) {

            // Get the attitude of the device
            CMQuaternion quaternion = motion.attitude.quaternion;

            [self sendEventWithName:@"OrientationAngle" body:@{
                @"x" : [NSNumber numberWithDouble: quaternion.x],
                @"y" : [NSNumber numberWithDouble: quaternion.y],
                @"z" : [NSNumber numberWithDouble: quaternion.z],
                @"w" : [NSNumber numberWithDouble: quaternion.w]
            }];
        
        }];

        NSLog(@"Device motion started");
    } else {
        NSLog(@"Device motion unavailable");
    }
}

// Will be called when this module's last listener is removed, or on dealloc.
- (void)stopObserving {
    NSLog(@"Device motion stop");
    
    // Remove upstream listeners, stop unnecessary background tasks
    [_motionManager stopDeviceMotionUpdates];
}

RCT_EXPORT_METHOD(setUpdateInterval:(float) newInterval) {
    float interval = newInterval / 1000; // millisecond to second
    
    NSLog(@"setUpdateInterval: %f", interval);
	
    [_motionManager setDeviceMotionUpdateInterval:interval];
}

RCT_EXPORT_METHOD(getUpdateInterval:(RCTResponseSenderBlock) callback) {
    float interval = _motionManager.deviceMotionUpdateInterval * 1000; // second to millisecond

    NSLog(@"getUpdateInterval: %f", interval);

    callback(@[[NSNumber numberWithFloat:interval]]);
}

@end
