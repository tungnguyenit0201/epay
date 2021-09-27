//
//  VnptExtension.swift
//  EPayDev
//
//  Created by trinhhc on 8/17/21.
//

import UIKit

extension Dictionary where Key == String, Value == Any{

    static func += (left: inout [Key: Value], right: [Key: Value]) {
        for (key, value) in right {
            left[key] = value
        }
    }
}

extension UIImage {
  
  func resizeImage(targetSize: CGSize) -> UIImage {
    let size = self.size
    
    let widthRatio  = targetSize.width  / size.width
    let heightRatio = targetSize.height / size.height
    
    // Figure out what our orientation is, and use that to form the rectangle
    var newSize: CGSize
    if(widthRatio > heightRatio) {
      newSize = CGSize(width: size.width * heightRatio, height: size.height * heightRatio)
    } else {
      newSize = CGSize(width: size.width * widthRatio,  height: size.height * widthRatio)
    }
    
    // This is the rect that we've calculated out and this is what is actually used below
    let rect = CGRect(x: 0, y: 0, width: newSize.width, height: newSize.height)
    
    // Actually do the resizing to the rect using the ImageContext stuff
    UIGraphicsBeginImageContextWithOptions(newSize, false, 1.0)
    self.draw(in: rect)
    let newImage = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()
    
    return newImage!
  }
  
  func toBase64() -> String{
    return self.jpegData(compressionQuality: 1)?.base64EncodedString() ?? ""
  }
}

public extension UIColor {
  convenience init(hex: String) {
    let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
    var int = UInt64()
    Scanner(string: hex).scanHexInt64(&int)
    let a, r, g, b: UInt64
    switch hex.count {
    case 3: // RGB (12-bit)
      (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
    case 6: // RGB (24-bit)
      (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
    case 8: // ARGB (32-bit)
      (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
    default:
      (a, r, g, b) = (255, 0, 0, 0)
    }
    self.init(red: CGFloat(r) / 255, green: CGFloat(g) / 255, blue: CGFloat(b) / 255, alpha: CGFloat(a) / 255)
  }
}

public extension Dictionary where Key == String, Value == Any {
  func string(key: String,defaultValue: String ) -> String {
    return self[key].defaultString(defaultValue)
  }
  
  func int(key: String,defaultValue: Int ) -> Int {
    return self[key].defaultInt(defaultValue)
  }
  
  func bool(key: String,defaultValue: Bool ) -> Bool {
    return self[key].defaultBool(defaultValue)
  }
  
  func cgFloat(key: String,defaultValue: CGFloat ) -> CGFloat {
    return self[key].defaultCGFloat(defaultValue)
  }
  
  func array(key: String,defaultValue:[Any]) -> [Any]{
    return  self[key].defaultArray(defaultValue)
  }
  
  func float(key: String,defaultValue: Float ) -> Float {
    return self[key].defaultFloat(defaultValue)
  }
}


extension Optional where Wrapped == Any {
  
  func defaultString(_ value: String = "") -> String{
    return self as? String ?? value
  }
  
  func defaultInt(_ value: Int = 0) -> Int {
    return self as? Int ?? value
  }
  
  func defaultBool(_ value: Bool = false) -> Bool {
    return self as? Bool ?? value
  }
  
  func defaultCGFloat(_ value: CGFloat = 0.0) -> CGFloat {
    return self as? CGFloat ?? value
  }
  
  func defaultArray(_ value: [Any] = []) -> [Any] {
    return self as? [Any] ?? value
  }
  
  func defaultFloat(_ value: Float)-> Float {
    return self as? Float ?? value
  }
}
