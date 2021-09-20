//
//  VnptEkycTwoSideResponse.swift
//  EPayDev
//
//  Created by trinhhc on 8/18/21.
//

import UIKit
#if !targetEnvironment(simulator)
import BioSDK
class VnptEkycResponse {
  private static let MAX_IMAGE_WIDTH = 600
  private static let MAX_IMAGE_HEGHT = 900
  private static let IMAGE_QUALITY = 100
  static func document(_ dataModel: DataModel) -> [Dictionary<String,Any>] {
    return dataModel.documentType == DocumentType.oneside ? oneSide(dataModel) : twoSide(dataModel)
  }
  
  static func oval(_ dataModel: DataModel) -> [Dictionary<String,Any>] {
    
    guard  let farImage = dataModel.farImage, let nearImage = dataModel.nearImage else {
      return VnptEkycState.error(.SDK_ERROR).arrayValue()
    }
    
    return VnptEkycState.faceOvalResult(convertImageToBase64(image: farImage), convertImageToBase64(image: nearImage)).arrayValue()
  }
  
  static func summary(_ orcDataModel: DataModel,_ faceDataModel: DataModel) -> [Dictionary<String,Any>]  {
    guard  var orcResult = document(orcDataModel).first, let faceResult = oval(faceDataModel).first else {
      return VnptEkycState.error(.SDK_ERROR).arrayValue()
    }
    orcResult += faceResult
    return [orcResult]
  }
  
}

extension VnptEkycResponse {
  static private func twoSide(_ dataModel: DataModel) -> [[String:Any]] {
    guard let frontImage = dataModel.frontImage,
          let backImage = dataModel.backImage else {
      return VnptEkycState.error(.SDK_ERROR).arrayValue()
    }
    
    return VnptEkycState.twoSideResult(convertImageToBase64(image: frontImage),convertImageToBase64(image: backImage)).arrayValue()
  }
  
  static private func oneSide(_ dataModel: DataModel) -> [[String:Any]] {
    guard let image = dataModel.image else {
      return VnptEkycState.error(.SDK_ERROR).arrayValue()
    }
    
    let cropedImage = dataModel.cropImage(image: image)
    return VnptEkycState.oneSideResult(convertImageToBase64(image: image),convertImageToBase64(image: cropedImage)).arrayValue()
  }
}

extension VnptEkycResponse {
  private static func convertImageToBase64(image: UIImage) -> String  {
    let resizeImage: UIImage = image.resizeImage(targetSize: CGSize(width: MAX_IMAGE_WIDTH, height: MAX_IMAGE_HEGHT))
    return resizeImage.toBase64()
  }
}
#endif
