//
//  BiometricModule.m
//  EPAY
//
//  Created by trinhhcse on 29/10/2021.
//

#import "BiometricModule.h"

@implementation BiometricModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(isEnrolledAsync:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
  LAContext *context = [LAContext new];
  NSError *error = nil;

  BOOL isSupported = [context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error];
  BOOL isEnrolled = isSupported && error == nil;

  NSData *evaluatedPolicyDomainStateData = context.evaluatedPolicyDomainState;
  NSData *base64String = [evaluatedPolicyDomainStateData base64EncodedDataWithOptions:0];
  NSString *token = [[NSString alloc] initWithData:base64String encoding:NSUTF8StringEncoding];
  if(token && [token isEqualToString:@""]){
    token = [[NSUUID UUID] UUIDString];
  }
  
  resolve(@{
    @"isEnrolled": @(isEnrolled),
    @"token": token,
  });
}

@end
