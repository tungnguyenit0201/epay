package com.epay.service.wallet.walletcore.utils;

import lombok.SneakyThrows;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.security.spec.KeySpec;
import java.util.Arrays;
import java.util.Base64;

/**
 * @author duynd
 * @created 24/08/2021
 */

public class AESUtils {
    private static final String TRANSFORMATION = "AES/GCM/PKCS5Padding";
    private static final String ALGORITHM = "AES";
    private static final SecureRandom random = new SecureRandom();
    private static final int GCM_AUTHENTICATION_TAG_SIZE_BITS = 128;
    private static final int GCM_IV_NONCE_SIZE_BYTES = 12;
    private static final int PBKDF2_SALT_SIZE_BYTES = 32;
    private static final int PBKDF2_ITERATIONS = 65536;
    private static final int AES_KEY_LENGTH_BITS = 256;

    private static byte[] generateRandomArray(int sizeInBytes) {
        final byte[] randomArray = new byte[sizeInBytes];
        random.nextBytes(randomArray);
        return randomArray;
    }

    @SneakyThrows
    private static SecretKey getSecretKey(char[] password, byte[] salt) {
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        KeySpec spec = new PBEKeySpec(password, salt, PBKDF2_ITERATIONS, AES_KEY_LENGTH_BITS);
        SecretKey tmp = factory.generateSecret(spec);
        return new SecretKeySpec(tmp.getEncoded(), ALGORITHM);
    }

    @SneakyThrows
    public static String encrypt(String data, String secretKey) {
        byte[] salt = generateRandomArray(PBKDF2_SALT_SIZE_BYTES);
        SecretKey key = getSecretKey(secretKey.toCharArray(), salt);
        byte[] newNonce = generateRandomArray(GCM_IV_NONCE_SIZE_BYTES);
        GCMParameterSpec spec = new GCMParameterSpec(GCM_AUTHENTICATION_TAG_SIZE_BITS, newNonce);
        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
        cipher.init(Cipher.ENCRYPT_MODE, key, spec);
        byte[] bytes = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
        byte[] result = Arrays.copyOf(salt, GCM_IV_NONCE_SIZE_BYTES + PBKDF2_SALT_SIZE_BYTES + bytes.length);
        System.arraycopy(newNonce, 0, result, PBKDF2_SALT_SIZE_BYTES, GCM_IV_NONCE_SIZE_BYTES);
        System.arraycopy(bytes, 0, result, GCM_IV_NONCE_SIZE_BYTES + PBKDF2_SALT_SIZE_BYTES, bytes.length);
        return Base64.getEncoder().encodeToString(result);
    }

    @SneakyThrows
    public static String decrypt(String dataEncrypted, String secretKey) {
        byte[] bytes = Base64.getDecoder().decode(dataEncrypted);
        byte[] salt = Arrays.copyOfRange(bytes, 0, PBKDF2_SALT_SIZE_BYTES);
        SecretKey key = getSecretKey(secretKey.toCharArray(), salt);
        byte[] newNonce = Arrays.copyOfRange(bytes, PBKDF2_SALT_SIZE_BYTES, PBKDF2_SALT_SIZE_BYTES + GCM_IV_NONCE_SIZE_BYTES);
        GCMParameterSpec spec = new GCMParameterSpec(GCM_AUTHENTICATION_TAG_SIZE_BITS, newNonce);
        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
        cipher.init(Cipher.DECRYPT_MODE, key, spec);
        return new String(cipher.doFinal(Arrays.copyOfRange(bytes, GCM_IV_NONCE_SIZE_BYTES + PBKDF2_SALT_SIZE_BYTES, bytes.length)), StandardCharsets.UTF_8);
    }
}