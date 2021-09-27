#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(VnptEkyc, NSObject)

RCT_EXTERN_METHOD(captureDocument:(NSDictionary*)config :(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(captureFace:(NSDictionary*)config :(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(captureFullFlow:(NSDictionary*)config :(RCTResponseSenderBlock)callback);


@end
