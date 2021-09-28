package com.mangoads.epay.nativemodules.vntpekyc.helper;

import com.vnptit.si.bio_sdk.model.FaceAdvanceOption;
import com.vnptit.si.bio_sdk.model.IntentParams;
import com.vnptit.si.bio_sdk.model.InvalidDocumentAlert;
import com.vnptit.si.bio_sdk.model.OneSideOption;
import com.vnptit.si.bio_sdk.model.OvalOption;
import com.vnptit.si.bio_sdk.model.TwoSideOption;
import com.vnptit.si.bio_sdk.utils.LanguageEnum;
import com.vnptit.si.bio_sdk.utils.SDKEnum;

public class VnptEkycOption {
    public IntentParams getIntentParamOfOneSideDocumentCamera(ConfigMap configMap) {
        OneSideOption option = new OneSideOption();

        option.title = configMap.getString("title", "Chụp ảnh giấy tờ");
        option.textGuideImage = configMap.getString("titleFront","MẶT TRƯỚC");// Chụp mặt  trước
        option.recaptureButtonText = configMap.getString("retakeButtonText", "Chụp lại");
        option.doneButtonText = configMap.getString("useImageButtonText", "Hoàn thành");
        option.textGuideButtonString = configMap.getString("viewTutorialButtonText", "Xem hướng dẫn");
        option.understoodTextString = configMap.getString("viewTutorialButtonUnderstoodText", "Đã hiểu");
        option.textHelp = configMap.getString("helpText", "Passport");
        option.textDescription = configMap.getString("textContentPreview", "Kiểm tra lại hình ảnh đã chụp, đảm bảo giấy tờ rõ nét, không bị mờ lóa, mất góc.");

        option.cameraType = SDKEnum.CameraType.BACK;
        option.titleColor = "#ffffff";
        option.backgroundCameraColor = "#80000000";
        option.doneButtonColor = "#6FC3EA";
        option.doneButtonBackgroundColor = "#FFFFFF";
        option.frameCornerColor = "#FFFFFF";

        option.understoodButtonBackgroundColor = "#6FC3EA";
        option.understoodTextColor = "#FFFFFF";
        option.textGuideImage = "";

        option.isHasTutorial = configMap.getBool("isShowTutorial", true);;
        option.isShowTradeMark = false;
        option.isSwitchCamera = false;
        option.isPreviewAnimation = false;
        option.isShowVersion = false;
        option.showPreviewTitle = true;
        option.isValidDocument = false;
        option.autoNext = false;

        IntentParams intentParams = new IntentParams();
        intentParams.setOneSideOption(option);
        intentParams.setSdkType(SDKEnum.Type.ONE_SIDE);
        return intentParams;
    }

    public IntentParams getIntentParamOfTwoSideDocumentCamera(ConfigMap configMap) {
        TwoSideOption option = new TwoSideOption();

        option.title = configMap.getString("title", "Chụp ảnh giấy tờ");
        option.backTitle = configMap.getString("titleBack", "Chụp ảnh giấy tờ");
//        oneSideOption.textDescription = configMap.getString("textContentPreview","Bạn hãy đảm bảo hình chụp không bị mờ, tối hoặc chói sáng.");
        option.recaptureButtonText = configMap.getString("retakeButtonText", "Chụp lại");
        option.doneButtonText = configMap.getString("useImageButtonText", "Dùng ảnh");
        option.backDoneButtonText = configMap.getString("btnFinishTitle", "Hoàn thành");
        option.textGuideButtonString = configMap.getString("viewTutorialButtonText", "Xem hướng dẫn");
        option.understoodTextString = configMap.getString("viewTutorialButtonUnderstoodText", "Đã hiểu");
        option.textHelp = configMap.getString("frontHelpText", "CMND/CCCD");
        option.backTextHelp = configMap.getString("backHelpText", "CMND/CCCD");

        option.cameraType = SDKEnum.CameraType.BACK;
        option.titleColor = "#ffffff";
        option.backgroundCameraColor = "#80000000";
        option.doneButtonColor = "#6FC3EA";
        option.doneButtonBackgroundColor = "#FFFFFF";
        option.frameCornerColor = "#FFFFFF";

        option.understoodButtonBackgroundColor = "#6FC3EA";
        option.understoodTextColor = "#FFFFFF";
        option.backTextGuideImage = configMap.getString("titleBack", "MẶT SAU");// Chụp mặt sau
        option.textGuideImage = configMap.getString("titleFront", "MẶT TRƯỚC");// Chụp mặt  trước
        option.textDescription = configMap.getString("frontHelpPreview", "Kiểm tra lại hình ảnh đã chụp, đảm bảo giấy tờ rõ nét, không bị mờ lóa, mất góc.");
        option.backTextDescription = configMap.getString("backHelpPreview", "Kiểm tra lại hình ảnh đã chụp, đảm bảo giấy tờ rõ nét, không bị mờ lóa, mất góc.");

        option.isHasTutorial = true;
        option.isShowTradeMark = false;
        option.isSwitchCamera = false;
        option.isPreviewAnimation = false;
        option.isShowVersion = false;
        option.showPreviewTitle = true;
        option.autoNext = false;
        option.isValidDocument = false;


        IntentParams intentParams = new IntentParams();
        intentParams.setTwoSideOption(option);
        intentParams.setSdkType(SDKEnum.Type.TWO_SIDE);
        return intentParams;
    }


    public IntentParams getIntentParamOfFaceOvalCamera(ConfigMap configMap) {
        OvalOption ovalOption = new OvalOption();
        ovalOption.languageEnum = configMap.getString("language", "vn").equalsIgnoreCase("vn") ? LanguageEnum.VI : LanguageEnum.EN;
        ovalOption.isShowTutorial = true;
        ovalOption.isSkipTutorial = true;

        IntentParams intentParams = new IntentParams();
        intentParams.setOvalOption(ovalOption);
        intentParams.setSdkType(SDKEnum.Type.FACE_OVAL);
        return intentParams;
    }
}
