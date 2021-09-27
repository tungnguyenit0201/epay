import Foundation
import React

#if !targetEnvironment(simulator)
import BioSDK

@objc(VnptEkyc)
class VnptEkyc: NSObject {
  
  @objc func captureFullFlow(_ config: [String: Any],_ callback: @escaping RCTResponseSenderBlock) {
    DocumentCamera().show(config){ orcDataModel,error in
      DispatchQueue.global().async {
        //Save data into local storage
        
        if let error = error, !error.isEmpty {
          callback(VnptEkycState.error(.SDK_ERROR).arrayValue())
          return
        }
        
        guard let orcDataModel = orcDataModel else{
          callback(VnptEkycState.error(.USER_CANCELLED).arrayValue())
          return
        }
        
        FaceOvalCamera().show(config){ faceDataModel,error in
          if let error = error, !error.isEmpty {
            callback(VnptEkycState.error(.SDK_ERROR).arrayValue())
            return
          }
          
          guard let faceDataModel = faceDataModel else{
            callback(VnptEkycState.error(.USER_CANCELLED).arrayValue())
            return
          }
          
          callback(VnptEkycResponse.summary(orcDataModel,faceDataModel))
        }
      }
    }
  }

  @objc func captureDocument(_ config: [String: Any],_ callback: @escaping RCTResponseSenderBlock) {
    DocumentCamera().show(config){ orcDataModel,error in
      DispatchQueue.global().async {
        //Save data into local storage
        
        if let error = error, !error.isEmpty {
          callback(VnptEkycState.error(.SDK_ERROR).arrayValue())
          return
        }
        
        guard let orcDataModel = orcDataModel else{
          callback(VnptEkycState.error(.USER_CANCELLED).arrayValue())
          return
        }
        
        callback(VnptEkycResponse.document(orcDataModel))
      }
    }
  }

  @objc func captureFace(_ config: [String: Any],_ callback: @escaping RCTResponseSenderBlock) {
    FaceOvalCamera().show(config){ faceDataModel,error in
      if let error = error, !error.isEmpty {
        callback(VnptEkycState.error(.SDK_ERROR).arrayValue())
        return
      }
      
      guard let faceDataModel = faceDataModel else{
        callback(VnptEkycState.error(.USER_CANCELLED).arrayValue())
        return
      }
      
      callback(VnptEkycResponse.oval(faceDataModel))
    }
  }
}

#else

@objc(VnptEkyc)
class VnptEkyc: NSObject {
  
  @objc func captureDocument(_ config: [String: Any],_ callback: @escaping RCTResponseSenderBlock) {
    
  }
  
  @objc func captureFace(_ config: [String: Any],_ callback: @escaping RCTResponseSenderBlock) {
    
  }

  @objc func captureFullFlow(_ config: [String: Any],_ callback: @escaping RCTResponseSenderBlock) {
    
  }
}

#endif
