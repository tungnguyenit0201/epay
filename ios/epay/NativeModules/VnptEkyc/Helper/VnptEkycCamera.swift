//
//  VnptEkycCamera.swift
//  EPayDev
//
//  Created by trinhhc on 8/17/21.
//


import UIKit
import UIKit
#if !targetEnvironment(simulator)
import BioSDK

class FaceOvalCamera : CameraDelegate {
  var onCompleted: ((DataModel?,String?)->Void)?
  
  func show(_ config: [String:Any], onCompleted: @escaping (DataModel?,String?)->Void)  {
    self.onCompleted = onCompleted
    DispatchQueue.main.async {
      guard let rootVC = UIApplication.shared.delegate?.window??.rootViewController else {return}
      let vc = self.defaultInstance(config)
      vc.show(rootVC)
    }
  }
  
  internal func defaultInstance(_ config: [String:Any]) -> Camera {
    let vc = Camera()
    vc.delegate = self
    VnptEkycOption.setOvalOption(vc, config)
    
    return vc
  }
  
  internal func onResult(_ data: DataModel) {
    onCompleted?(data,nil)
  }
  
  func onClose() {
    onCompleted?(nil,nil)
  }
  
  func onError(_ message: String) {
    onCompleted?(nil,message)
  }
}

class DocumentCamera : CameraDelegate {
  var onResult: ((DataModel?,String?)->Void)?
  func show(_ config: [String:Any],_ onResult:@escaping ((DataModel?,String?)->Void))  {
    self.onResult = onResult
    DispatchQueue.main.async {
      guard let rootVC = UIApplication.shared.delegate?.window??.rootViewController else {return}
      let vc = self.defaultInstance(config)
      vc.show(rootVC)
    }
  }
  
  internal func defaultInstance(_ config: [String:Any]) -> Camera {
    let vc = Camera()
    vc.delegate = self
    VnptEkycOption.setDocumentSideOption(vc,config)
    
    return vc
  }
  
  internal func onResult(_ data: DataModel) {
    onResult?(data,nil)
  }
  
  func onClose() {
    onResult?(nil,nil)
  }
  
  func onError(_ message: String) {
    onResult?(nil,message)
  }
}


#endif
