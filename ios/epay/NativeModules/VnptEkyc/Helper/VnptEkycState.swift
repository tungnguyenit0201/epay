//
//  VnptEkycState.swift
//  EPayDev
//
//  Created by trinhhc on 8/17/21.
//

import UIKit

enum VnptEkycState {
  case error(VnptEkycConstants)
  case completed
  case faceAdvanceResult([String:Any])
  case oneSideResult(String)
  case twoSideResult(String,String)
  case faceOvalResult(String,String)
  
  func arrayValue()-> [[String:Any]] {
    switch self {
      case .error(let error):
        return [["errorCode":error.rawValue]]
      case .completed:
        return [["errorCode":""]]
      case .faceAdvanceResult(let result):
        return [result]
      case .oneSideResult(let imageBase64):
        return [[
          "imageBase64": imageBase64
        ]]
      case .twoSideResult(let frontImageBase64, let backImageBase64):
        return [[
          "frontImageBase64": frontImageBase64,
          "backImageBase64": backImageBase64
        ]]
      case .faceOvalResult(let farImageBase64,let nearImageBase64):
        return [[
          "farImageBase64": farImageBase64,
          "nearImageBase64": nearImageBase64,
        ]]
    }
  }
  
}

