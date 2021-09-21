const fs = require('fs');
const crypto = require('crypto');

function RSA() {
    var privateKey = fs.readFileSync('private.key').toString()
    var publicKey = fs.readFileSync('public.key').toString()

    this.Verify = function(time, data, signature) {
        var verifier = crypto.createVerify('SHA1')
        verifier.update(time, 'utf8');
        verifier.update(data, 'utf8');
        const result = verifier.verify(publicKey, signature, 'base64')
        return result
    }

    this.Sign = function(time, data) {
        var signer = crypto.createSign('SHA1')
        signer.update(time, 'utf8');
        signer.update(data, 'utf8');
        // Nhớ remove "RSA" trong nội dung key, cả  START và END
        // -----END RSA PRIVATE KEY----- 
        // ->
        // -----END PRIVATE KEY-----
        const result = signer.sign(privateKey, 'base64')
        return result
    }
}

module.exports = RSA