package com.mangoads.epay.nativemodules.vntpekyc;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.mangoads.epay.nativemodules.vntpekyc.helper.ConfigMap;
import com.mangoads.epay.nativemodules.vntpekyc.helper.VntpEkycCamera;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;

@ReactModule(name = VnptEkycModule.NAME)
public class VnptEkycModule extends ReactContextBaseJavaModule {
    public static final String NAME = "VnptEkyc";
    private ReactApplicationContext context;

    public VnptEkycModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        return constants;
    }

    @ReactMethod
    public void captureFullFlow(ReadableMap config, Callback callback) {
        new VntpEkycCamera(context).openDocumentCamera(new ConfigMap(config.toHashMap()), new Callback() {
            @Override
            public void invoke(Object... args) {
                WritableMap orcMap = (WritableMap)args[0];
                if (!orcMap.hasKey("errorCode")) {
                    new VntpEkycCamera(context).openFaceOvalCamera(new ConfigMap(config.toHashMap()), new Callback() {
                        @Override
                        public void invoke(Object... args) {
                            WritableMap faceMap = (WritableMap)args[0];
                            orcMap.merge(faceMap);
                            callback.invoke(orcMap);
                        }
                    });

                } else {
                    callback.invoke(orcMap);
                }
            }
        });
    }

    @ReactMethod
    public void captureDocument(ReadableMap config, Callback callback) {
        new VntpEkycCamera(context).openDocumentCamera(new ConfigMap(config.toHashMap()),callback);
    }

    @ReactMethod
    public void captureFace(ReadableMap config, Callback callback) {
        new VntpEkycCamera(context).openFaceOvalCamera(new ConfigMap(config.toHashMap()),callback);
    }

}
