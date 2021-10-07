//
//  VntpEkycOption.swift
//  EPayDev
//
//  Created by trinhhc on 8/18/21.
//

import UIKit
#if !targetEnvironment(simulator)
import BioSDK
class VnptEkycOption {
  
  
  static func setOvalOption(_ vc: Camera, _ config: [String:Any]) {
    vc.documentType = .oval
    vc.ovalOption = getFaceOvalOption(config)
  }
  
  static func  getFaceOvalOption(_ config: [String:Any]) -> OvalOption {
    let option = OvalOption()
    
    option.language = config.string(key: "language", defaultValue: "vn").elementsEqual("vn") ? .vn : .en
    option.isShowTutorial = true;
    option.isSkipTutorial = true;
    
    return option
  }
  
  static func setDocumentSideOption(_ vc: Camera, _ config: [String:Any]) {
    if config.string(key: "documentType", defaultValue: "twoSide").elementsEqual("twoSide") {
      vc.twoSideOption = getDocumentTwoSideOption(config)
      vc.documentType = .twoside
    } else {
      vc.oneSideOption = getDocumentOneSideOption(config)
      vc.documentType = .oneside
    }
  }
  
  static func  getDocumentTwoSideOption(_ config: [String:Any]) -> TwoSideOption {
    let option = TwoSideOption()
    option.title = config.string(key: "title", defaultValue: "Chụp ảnh giấy tờ")
    option.titleFont = config.string(key: "titleFront", defaultValue: "MẶT TRƯỚC")
    option.titleBack = config.string(key: "titleBack", defaultValue: "MẶT SAU")
    option.titleButtonRetake = config.string(key: "retakeButtonText", defaultValue: "Chụp lại")
    option.titleButtonNext = config.string(key: "useImageButtonText", defaultValue: "Dùng ảnh")
    option.btnFinishTitle = config.string(key: "btnFinishTitle", defaultValue: "Hoàn thành")
    option.titleBtnHelp = config.string(key: "viewTutorialButtonText", defaultValue: "Xem hướng dẫn")
    option.titleBtnUnderstand = config.string(key: "viewTutorialButtonUnderstoodText", defaultValue: "Đã hiểu")
    option.bgNextColor = UIColor.init(hex: "6FC3EA")
    option.bgColorBtnUnderstand = UIColor.init(hex: "1F5CAB")
    option.textColorBtnNext = UIColor.init(hex: "FFFFFF")
    option.textColorBtnUnderstand = UIColor.init(hex: "FFFFFF")
    option.frameCornerColor = UIColor.init(hex: "FFFFFF")
    option.backgroundCameraColor = UIColor.init(hex: "000000").withAlphaComponent(0.5)
    option.frontHelp = config.string(key: "frontHelpText", defaultValue: "CMND/CCCD")
    option.backHelp = config.string(key: "backHelpText", defaultValue: "CMND/CCCD")
    option.frontHelpPreview = config.string(key: "frontHelpPreview", defaultValue: "Kiểm tra lại hình ảnh đã chụp, đảm bảo giấy tờ rõ nét, không bị mờ lóa, mất góc.")
    option.backHelpPreview = config.string(key: "backHelpPreview", defaultValue: "Kiểm tra lại hình ảnh đã chụp, đảm bảo giấy tờ rõ nét, không bị mờ lóa, mất góc.")
    
    option.isValidDocument = true
    option.isShowPreviewTitle = true
    option.isPreviewAnimation = false
    option.isShowTutorial = true
    option.isShowLogo = false
    option.isValidDocument = false
    
    return option
  }
  
  static func  getDocumentOneSideOption(_ config: [String:Any]) -> OneSideOption {
    let option = OneSideOption()
    option.title = config.string(key: "title", defaultValue: "Chụp ảnh giấy tờ")
    option.textGuideImage = config.string(key: "titleFront", defaultValue: "MẶT TRƯỚC")
    option.titleButtonRetake = config.string(key: "retakeButtonText", defaultValue: "Chụp lại")
    option.titleButtonNext = config.string(key: "useImageButtonText", defaultValue: "Hoàn thành")
    option.btnFinishTitle = config.string(key: "btnFinishTitle", defaultValue: "Hoàn thành")
    option.titleBtnHelp = config.string(key: "viewTutorialButtonText", defaultValue: "Xem hướng dẫn")
    option.titleBtnUnderstand = config.string(key: "viewTutorialButtonUnderstoodText", defaultValue: "Đã hiểu")
    option.bgNextColor = UIColor.init(hex: "6FC3EA")
    option.bgColorBtnUnderstand = UIColor.init(hex: "1F5CAB")
    option.textColorBtnNext = UIColor.init(hex: "FFFFFF")
    option.textColorBtnUnderstand = UIColor.init(hex: "FFFFFF")
    option.frameCornerColor = UIColor.init(hex: "FFFFFF")
    option.backgroundCameraColor = UIColor.init(hex: "000000").withAlphaComponent(0.5)
    option.help = config.string(key: "helpText", defaultValue: "Passport")
    option.textContentPreview = config.string(key: "textContentPreview", defaultValue: "Kiểm tra lại hình ảnh đã chụp, đảm bảo giấy tờ rõ nét, không bị mờ lóa, mất góc.")
    
    option.isShowPreviewTitle = true
    option.isPreviewAnimation = false
    option.isShowTutorial = config.bool(key: "isShowTutorial", defaultValue: true)
    option.isShowLogo = false
    option.isValidDocument = false
    return option
  }
}
#endif
