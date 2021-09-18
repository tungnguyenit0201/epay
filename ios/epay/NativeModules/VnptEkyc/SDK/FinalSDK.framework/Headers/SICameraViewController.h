//
//  SICameraViewController.h
//  FinalSDK
//
//  Created by Nguyen Duy Hung on 4/20/21.
//  Copyright © 2021 Minh Nguyễn. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "FaceOvalViewController.h"

NS_ASSUME_NONNULL_BEGIN

@interface SICameraViewController : UIViewController

@property (nonatomic) UIColor *buttonTitleColor;
@property (nonatomic) UIColor *buttonReTakeColor;
@property (nonatomic) UIColor *buttonBackgroundColor;

@property (nonatomic) UIImage *logoTrademarkImage;
@property (nonatomic) BOOL isShowHelp;
@property (nonatomic) BOOL isShowTrademark;

@property (nonatomic) BOOL isSkipVoiceVideo;
@property (nonatomic) NSString *languageApplication; // "vi"
@property (weak, nonatomic) id<FaceOvalDelegate> ovalDelegate;

@end

NS_ASSUME_NONNULL_END
