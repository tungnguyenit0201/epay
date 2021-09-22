const crypto = require('./crypto');

function AES() {
    const secretKey = '9cbf8a4dcb8e30682b927f352d6559a0'

    let digest = 'sha256'
    let algo = 'aes-256-gcm'
    /**
     * Kiểm tra format decrypt từ server
     * salt[32] + iv[12] + cipertext[n] + authTag[16]
     */
    this.Encrypt = function (message) {
        // 1. Salt: Lenght 32
        let salt = crypto.randomBytes(32)
        const key = crypto.pbkdf2Sync(secretKey, salt, 65536, 32, digest)
        // 2. IV: Lenght 12
        let iv = crypto.randomBytes(12)
        // 3. Cipertext
        let bytes = Buffer.from(message, 'utf8')
        // I) KHỏi tạo encrypt ciper
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        // II) Encrypt data
        const encrypted = Buffer.concat([
            cipher.update(message, 'utf8'),
            cipher.final()
        ]);
        // III) Tách lấy auth tag
        const tag = cipher.getAuthTag();

        // generate output
        return Buffer.concat([salt, iv, encrypted, tag]).toString('base64');
    }

    /**
     * 
     * Kiểm tra format được encrypt từ server
     * salt[32] + iv[12] + cipertext[n] + authTag[16]
     * 
     */
    this.Decrypt = function(encrypted) {
        // Convert encrypted string to bytes
        let bytes = Buffer.from(encrypted, 'base64')

        // 1. Salt: Lenght 32
        let salt = bytes.subarray(0, 32)
        const key = crypto.pbkdf2Sync(secretKey, salt, 65536, 32, digest)

        // 2. IV: Lenght 12
        let iv = bytes.subarray(32, 32 + 12) // iv

        // 3. Cipertext
        let finalEnc = bytes.subarray(32 + 12, bytes.length - 16)

        // 4. Authtag: last 16 bytes
        let authTag = bytes.subarray(bytes.length - 16)

        // I) Khởi tạo Decrypt
        let decipher = crypto.createDecipheriv(algo, key, iv);
        // II) Apply auth tag
        decipher.setAuthTag(authTag); 
        // III) Bắt đầu decrypt 
        let decrypted = decipher.update(finalEnc, 'binary','utf8');
        // IV) Kiểm tra bytes còn thiếu và gắn thêm byte cho đủ đề convert về utf8
        decrypted += decipher.final('utf8');
        // Kết quả cuối cùng
        return decrypted.toString();
    }
}
module.exports = AES