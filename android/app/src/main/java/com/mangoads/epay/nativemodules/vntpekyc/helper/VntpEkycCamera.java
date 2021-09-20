package com.mangoads.epay.nativemodules.vntpekyc.helper;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.mangoads.epay.MainActivity;
import com.vnptit.si.bio_sdk.model.IntentParams;
import com.vnptit.si.bio_sdk.model.ResultData;
import com.vnptit.si.bio_sdk.sdk.BioSDK;
import com.vnptit.si.bio_sdk.sdk.CameraViewCallback;

import java.io.ByteArrayOutputStream;

public class VntpEkycCamera {
    //TODO: Move into config from BE IN RN
    private int MAX_IMAGE_WIDTH = 600;
    private int MAX_IMAGE_HEIGHT = 900;
    private int IMAGE_QUALITY = 100;
    private ReactApplicationContext context;

    public VntpEkycCamera(ReactApplicationContext reactApplicationContext) {
        super();
        this.context = reactApplicationContext;
    }

    //TODO: NEED TO REFACTOR INTO SAME FOLLOW WITH IOS LATER
    public void openDocumentCamera(ConfigMap configMap, Callback callback) {
        BioSDK bioSDK = new BioSDK(MainActivity.sharedMainActivity);
        boolean isTwoSide = configMap.getString("documentType","twoSide").equalsIgnoreCase("twoSide");
        IntentParams params =  isTwoSide?
                new VnptEkycOption().getIntentParamOfTwoSideDocumentCamera(configMap)  :
                new VnptEkycOption().getIntentParamOfOneSideDocumentCamera(configMap);
         bioSDK.openCameraView(params, new CameraViewCallback() {
            @Override
            public void onSuccess(ResultData resultData) {
                new Thread("vnpt_ekyc_orc") {
                    @Override
                    public void run() {
                        WritableMap result = new WritableNativeMap();
                        if (resultData != null){
                            try {
                                if (resultData.bitmapOneSide != null) {
                                    String imageBase64 = convertImageToBase64(resultData.bitmapOneSide);
                                    String imageCropBase64 = convertImageToBase64(resultData.getCropBitmap(resultData.bitmapOneSide));
                                    result.putString("imageBase64", imageBase64);
                                    result.putString("imageCropBase64", imageCropBase64);
                                } else if (resultData.bitmapFront != null && resultData.bitmapBack != null) {
                                    String frontImageBase64 = convertImageToBase64(resultData.bitmapFront);
                                    String backImageBase64 = convertImageToBase64(resultData.bitmapBack);
                                    result.putString("frontImageBase64", frontImageBase64);
                                    result.putString("backImageBase64", backImageBase64);
                                }
                            } catch (Exception e) {
                                result.putString("errorCode", "SDK_ERROR");
                            }
                        } else {
                            result.putString("errorCode", "SDK_ERROR");
                        }
                        callback.invoke(result);
                    }
                }.start();

            }

            @Override
            public void onError(String error) {
                WritableMap result = new WritableNativeMap();
                result.putString("errorCode", "SDK_ERROR");
                callback.invoke(result);
            }

            @Override
            public void onClose() {
                WritableMap result = new WritableNativeMap();
                result.putString("errorCode", "USER_CANCELLED");
                callback.invoke(result);
            }
        });
    }


    public void openFaceOvalCamera(ConfigMap configMap, Callback callback) {
        BioSDK bioSDK = new BioSDK(MainActivity.sharedMainActivity);

        bioSDK.openCameraView(new VnptEkycOption().getIntentParamOfFaceOvalCamera(configMap), new CameraViewCallback() {
            @Override
            public void onSuccess(ResultData resultData) {
                new Thread("vnpt_ekyc_face") {
                    @Override
                    public void run() {
                        WritableMap result = new WritableNativeMap();
                        if (resultData != null && resultData.nearPath != null && resultData.nearPath != null) {
                            try {
                                BitmapFactory.Options bmOptions = new BitmapFactory.Options();
                                Bitmap nearBitmap = BitmapFactory.decodeFile(resultData.getNearPath(), bmOptions);
                                Bitmap farBitmap = BitmapFactory.decodeFile(resultData.getFarPath(), bmOptions);

                                String nearImageBase64 = convertImageToBase64(nearBitmap);
                                String farImageBase64 = convertImageToBase64(farBitmap);
                                result.putString("nearImageBase64", nearImageBase64);
                                result.putString("farImageBase64", farImageBase64);
                            } catch (Exception e) {
                                result.putString("errorCode", "SDK_ERROR");
                            }
                        } else {
                            result.putString("errorCode", "SDK_ERROR");
                        }
                        callback.invoke(result);
                    }
                }.start();

            }

            @Override
            public void onError(String error) {
                WritableMap result = new WritableNativeMap();
                result.putString("errorCode", "SDK_ERROR");
                callback.invoke(result);
            }

            @Override
            public void onClose() {
                WritableMap result = new WritableNativeMap();
                result.putString("errorCode", "USER_CANCELLED");
                callback.invoke(result);
            }
        });
    }


    private String convertImageToBase64(Bitmap bitmap) throws Exception {
        Bitmap resizeImage = resizeImage(bitmap,MAX_IMAGE_WIDTH,MAX_IMAGE_HEIGHT);
        ByteArrayOutputStream stream = new ByteArrayOutputStream();

        resizeImage.compress(Bitmap.CompressFormat.JPEG, IMAGE_QUALITY, stream);
        byte[] image = stream.toByteArray();
        String imageBase64 = Base64.encodeToString(image, 0);

        if (stream != null) {
            stream.close();
        }
        return imageBase64;
    }


    public static Bitmap resizeImage(Bitmap image, int maxWidth, int maxHeight) {
        Bitmap newImage = null;
        if (image == null) {
            return null; // Can't load the image from the given path.
        }

        if (maxHeight > 0 && maxWidth > 0) {
            float width = image.getWidth();
            float height = image.getHeight();

            float ratio = Math.min((float) maxWidth / width, (float) maxHeight / height);

            int finalWidth = (int) (width * ratio);
            int finalHeight = (int) (height * ratio);
            newImage = Bitmap.createScaledBitmap(image, finalWidth, finalHeight, true);
        }

        return newImage;
    }


}
