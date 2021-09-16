package com.epay.service.wallet.walletcore.utils;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

/**
 * User: nguyenlt(luutran.nguyen@epayjsc.com)
 * Date 3/5/2021
 * Time 8:46 AM)
 */
@UtilityClass
@Slf4j
public class RSAUtil {
    private static final String TRANSFORMATION = "RSA/ECB/PKCS1Padding";

    public static PublicKey getPublicKeyFromFile(String fileName)
            throws IOException, URISyntaxException, InvalidKeySpecException, NoSuchAlgorithmException {
        String publicKey = new String(Files.readAllBytes(Paths.get(ClassLoader.getSystemResource(fileName).toURI())));
        publicKey = publicKey.replaceAll("\\n", "").replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "");
        return getPublicKey(publicKey);
    }

    public static PublicKey getPublicKey(String base64PublicKey) throws InvalidKeySpecException, NoSuchAlgorithmException {
        PublicKey publicKey = null;
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(Base64.getDecoder().decode(base64PublicKey));
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        publicKey = keyFactory.generatePublic(keySpec);
        return publicKey;
    }

    public static PrivateKey getPrivateKeyFromFile(String fileName)
            throws IOException, URISyntaxException, NoSuchAlgorithmException, InvalidKeySpecException {
        String privateKey = new String(Files.readAllBytes(Paths.get(ClassLoader.getSystemResource(fileName).toURI())));
        privateKey = privateKey.replaceAll("\\n", "").replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "");
        return getPrivateKey(privateKey);
    }

    public static PrivateKey getPrivateKey(String base64PrivateKey) throws NoSuchAlgorithmException, InvalidKeySpecException {
        PrivateKey privateKey = null;
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(Base64.getDecoder().decode(base64PrivateKey));
        KeyFactory keyFactory = null;
        keyFactory = KeyFactory.getInstance("RSA");
        privateKey = keyFactory.generatePrivate(keySpec);
        return privateKey;
    }

    public byte[] encrypt(String data, PublicKey publicKey) throws BadPaddingException, IllegalBlockSizeException,
            InvalidKeyException, NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeySpecException {
        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        return cipher.doFinal(data.getBytes());
    }

    public String encrypt(String data, String base64PublicKey) throws InvalidKeySpecException, NoSuchAlgorithmException, IllegalBlockSizeException, InvalidKeyException, NoSuchPaddingException, BadPaddingException {
        byte[] bytes = encrypt(data, getPublicKey(base64PublicKey));
        return Base64.getEncoder().encodeToString(bytes);
    }

    public String decrypt(byte[] data, PrivateKey privateKey) throws NoSuchPaddingException, NoSuchAlgorithmException,
            InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        return new String(cipher.doFinal(data));
    }

    public String decrypt(String data, String base64PrivateKey) throws IllegalBlockSizeException, InvalidKeyException,
            BadPaddingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeySpecException {
        return decrypt(Base64.getDecoder().decode(data.getBytes()), getPrivateKey(base64PrivateKey));
    }

    public static String sign(String plainText, PrivateKey privateKey) {
        Signature privateSignature;
        try {
            privateSignature = Signature.getInstance("SHA1withRSA");
            privateSignature.initSign(privateKey);
            privateSignature.update(plainText.getBytes());
            byte[] signature;
            signature = privateSignature.sign();
            return Base64.getEncoder().encodeToString(signature);
        } catch (SignatureException | NoSuchAlgorithmException | InvalidKeyException e) {
            log.error("sign exception", e);
        }
        return null;
    }

    public static boolean verify(String plainText, String signature, PublicKey publicKey) {
        try {
            Signature publicSignature = Signature.getInstance("SHA1withRSA");
            publicSignature.initVerify(publicKey);
            publicSignature.update(plainText.getBytes());

            byte[] signatureBytes = Base64.getDecoder().decode(signature);

            return publicSignature.verify(signatureBytes);
        } catch (NoSuchAlgorithmException | InvalidKeyException | SignatureException e) {
            log.error("verify exception", e);
        }
        return false;
    }

    public static String sign(String plainText, String base64PrivateKey) {
        Signature privateSignature;
        try {
            PrivateKey privateKey = getPrivateKey(base64PrivateKey);
            privateSignature = Signature.getInstance("SHA1withRSA");
            privateSignature.initSign(privateKey);
            privateSignature.update(plainText.getBytes());
            byte[] signature;
            signature = privateSignature.sign();
            return Base64.getEncoder().encodeToString(signature);
        } catch (SignatureException | NoSuchAlgorithmException | InvalidKeyException | InvalidKeySpecException e) {
            log.error("sign exception", e);
        }
        return null;
    }

    public static boolean verify(String plainText, String signature, String base64PublicKey) {
        try {
            PublicKey publicKey = getPublicKey(base64PublicKey);
            Signature publicSignature = Signature.getInstance("SHA1withRSA");
            publicSignature.initVerify(publicKey);
            publicSignature.update(plainText.getBytes());

            byte[] signatureBytes = Base64.getDecoder().decode(signature);

            return publicSignature.verify(signatureBytes);
        } catch (NoSuchAlgorithmException | InvalidKeyException | SignatureException | InvalidKeySpecException e) {
            log.error("verify exception", e);
        } catch (Exception e) {
            log.error("verify exception", e);
        }
        return false;
    }
}