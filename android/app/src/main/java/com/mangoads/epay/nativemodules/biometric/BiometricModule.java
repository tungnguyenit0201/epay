package com.mangoads.epay.nativemodules.biometric;


import android.os.Build;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyPermanentlyInvalidatedException;
import android.security.keystore.KeyProperties;
import android.util.Base64;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.biometric.BiometricManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.module.annotations.ReactModule;

import java.security.Key;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.KeyStore;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.cert.Certificate;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.crypto.Cipher;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;

@ReactModule(name = com.mangoads.epay.nativemodules.vntpekyc.VnptEkycModule.NAME)
public class BiometricModule extends ReactContextBaseJavaModule {
    public static final String NAME = "BiometricModule";
    public static final String KEY_NAME = "EPAY_BIO";
    private static final String SECRET_MESSAGE = "EPAY_BIO_SECRET";
    private ReactApplicationContext context;
    private final BiometricManager mBiometricManager;

    public BiometricModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
        mBiometricManager = BiometricManager.from(context);
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
    public void isEnrolledAsync(Promise promise) {
        WritableMap writableMap = new WritableNativeMap();
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    int result = mBiometricManager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_WEAK);
                    boolean isEnrolled = result == BiometricManager.BIOMETRIC_SUCCESS;
                    writableMap.putBoolean("isEnrolled",isEnrolled );
                    try{
                        Cipher cipher = getCipher();
                        KeyPair keyPair = getKeyPair();
                        if(keyPair == null) {
                            keyPair = getKeyPair();
                        }

                        cipher.init(Cipher.DECRYPT_MODE, keyPair.getPrivate());
                        String token = Base64.encodeToString(keyPair.getPublic().getEncoded(), 2);
                        if(token != null) {
                            writableMap.putString("token",token);
                        }
                        promise.resolve(writableMap);
                    }  catch (KeyPermanentlyInvalidatedException ex) {
                        try {
                            genKeyPair();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        isEnrolledAsync(promise);
                    } catch (Exception ex) {
                        ex.printStackTrace();
                        promise.resolve(writableMap);
                    }
                }
            }).start();
        } else {
            writableMap.putBoolean("isEnrolled",false);
            writableMap.putString("token", UUID.randomUUID().toString());
            promise.resolve(writableMap);
        }
    }


    @RequiresApi(api = Build.VERSION_CODES.N)
    private KeyPair genKeyPair() throws Exception {
        return generateKeyPair(
                new KeyGenParameterSpec.Builder(
                        KEY_NAME,
                        KeyProperties.PURPOSE_DECRYPT)
                        .setDigests(KeyProperties.DIGEST_SHA256, KeyProperties.DIGEST_SHA512)
                        .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_RSA_OAEP)
                        .setInvalidatedByBiometricEnrollment(true)
                        .setUserAuthenticationRequired(true)
                        .build());
    }
    @RequiresApi(api = Build.VERSION_CODES.M)
    private KeyPair generateKeyPair(KeyGenParameterSpec keyGenParameterSpec) throws Exception {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(
                KeyProperties.KEY_ALGORITHM_RSA, "AndroidKeyStore");
        keyPairGenerator.initialize(keyGenParameterSpec);
        return keyPairGenerator.generateKeyPair();
    }

    private KeyPair getKeyPair() throws Exception {
        KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");

        // Before the keystore can be accessed, it must be loaded.
        keyStore.load(null);
        Key key = keyStore.getKey(KEY_NAME, null);
        if (key instanceof PrivateKey && keyStore.getCertificate(KEY_NAME) != null) {
            // Get certificate of public key
            Certificate cert = keyStore.getCertificate(KEY_NAME);

            // Get public key
            PublicKey publicKey = cert.getPublicKey();

            // Return a key pair
            return new KeyPair(publicKey, (PrivateKey) key);
        }
        return null;
    }

    private Cipher getCipher() throws NoSuchPaddingException, NoSuchAlgorithmException {
        return Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
    }

}