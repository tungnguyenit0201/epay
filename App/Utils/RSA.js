const crypto = require('./crypto');

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCbojeYi4bmpeT9
k5CmZ5lnCM/KghxqHOJmSk/cRVeGqEJV6p1y0IYwr4DoTRoFTDuZv/XtZGv/jm4d
RBC5CqJZgQmflNomSVrIZ9VQMlL0Bihy1HRplqJPU0S+any7ur49Tx0bBJQ2dbuX
klAxIB7AvfUGe8xi1Gbb2PXSYPeLN4KCFUE5JgRf4lqK8Q0FiDI/gpSrSrckg9YW
srlNQefWWl3xFkoBV4kwwYUNvQYso4yASiSK7hCdgRgLtNTEFXV1WivvTB42/BCY
WhyohX55R8Lq62Z8kEJNh4PP0NNyXs9Lm+vABY3I2zhvyhKO4V0A7VgOcKR7yiiy
OBIWDwxrAgMBAAECggEAPWdeKgh6vAud8lJDUvQy+Qzn9s0o6tDknlkZcx3Er7M5
IO7FGiSdnR3RbVXmO0rdhQbQv83MMnL+jPtq4acJcOjRZC31d/+fGsykw9RnGDJJ
ySx7laFB/qwqxjn7ZpICNuw83okK9QW0ctPeYdN7bq5Du0Ai3qdQwdKzAkMRx9IM
YPtBWB34OXh2AcNXmP0lRoEbtyATrgc6MxPpjta3zQvEIIgqaLTVuGb4+/uonmTg
Y1tRjVNmw7kD6JqLBTqHgR1uCNkK2qyjtC7dWl9ZkJaJkTftyyWEKw4KcwCro67u
aeg9W4tkN4OIQrOy2LSshgMtYFxHNqUxqOHa/UXWqQKBgQDHqJR34eRpU6KbJ9Gm
L4sbUOxDc8k0/XFFTIeCTFEm7BGosL78FjrpKw2lsvBttp2E1AfvlnxkPcGMUNNG
XAKHEsKRcWj1tInzQFY6V9o8MfgiRBVnMhlCV6htttbhXvxvk78TbioLUoGomrGd
xZrZee6ZXYwzQSaFlEOQMLKKZwKBgQDHjUMaPCpEPCa5WwK3UI0Aj2EPSU8qbqUa
KuMA4SghmNDy1IVA8KJJ+UfIohteZLjoCcNKuExd8K92AwhAZuPs/h8aCdyCCyYB
Qe5ib7/7QxouulNHhmPg76lj7QGueIsD0odIBUJKSYW7Dl72f/7zLfjH5zNat0EN
xocTx7XzXQKBgEQsshWFUqMMZdeo7xNZ5Jv9M8+Md8XaTJUnHpZFTOiHbzg0seIO
DSuVAeH0idhMpNi4NcV/kxX/aFlrN9ksjchlhX54RSiw7vHapBbj7KblQR8iNFS6
bJmUqPRdnF30Oyo2PuZ5lW2sTI2v1LpUwR1FX02K/dZ6hpbSG4feuPg9AoGBAJdr
59lGgkQY6MGJ//ueUgB0zA/PbxUhtIKwvGR0dgFYdmVtQlhOwLclQ4VJDT+Jao4Y
qmpOgxRdiKciEebcrGOvSWZ2yS6cyw/1ObDUX3eIKZv/oyYJIk0TTxQWSkpcChCy
dhj+dJjuRV31v7WI1qss3TTDicJygBi15tXpm3W5AoGANqpzH46A7MS3VafKE6rB
9Bi0yVUZ52FEbzVQqe50uHsI9+fkVMYMWAbMnjPTpLwbbNkl/esdqqJpB7MZzSTN
PcGhZHCYErTM7GH/kqqf5nWBQqylj7jILxzCxpehOOJJwFDNK/OPlxg/dw0A0RRN
nW1gj9LrBu485GbLvefhmsA=
-----END PRIVATE KEY-----`

const publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAm6I3mIuG5qXk/ZOQpmeZZwjPyoIcahziZkpP3EVXhqhCVeqdctCG
MK+A6E0aBUw7mb/17WRr/45uHUQQuQqiWYEJn5TaJklayGfVUDJS9AYoctR0aZai
T1NEvmp8u7q+PU8dGwSUNnW7l5JQMSAewL31BnvMYtRm29j10mD3izeCghVBOSYE
X+JaivENBYgyP4KUq0q3JIPWFrK5TUHn1lpd8RZKAVeJMMGFDb0GLKOMgEokiu4Q
nYEYC7TUxBV1dVor70weNvwQmFocqIV+eUfC6utmfJBCTYeDz9DTcl7PS5vrwAWN
yNs4b8oSjuFdAO1YDnCke8oosjgSFg8MawIDAQAB
-----END RSA PUBLIC KEY-----`

function RSA() {

    this.Verify = function(time, data, signature) {
        const verifier = crypto.createVerify('RSA-SHA1')
        verifier.update(time, 'utf8');
        verifier.update(data, 'utf8');
        const result = verifier.verify(publicKey, signature, 'base64')
        return result
    }

    this.Sign = function(time, data) {
        const signer = crypto.createSign('RSA-SHA1')
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