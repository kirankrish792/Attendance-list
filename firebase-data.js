const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const firebaseConfig = {
    "type": "service_account",
    "project_id": "biometric-attendance-953b9",
    "private_key_id": "73c7379a5e2cbdfdede0313d2c39bf46634da859",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3hks/9VOh3IKw\nnhDEWXjbVuSYuDjLFHGuP+XxYl6x0ESo+7Oon915gXykzlvlccvwxEyiMsUZJSZc\n/NgQyAWkJiEHkDPV4hFbAga5weqU+r0XLddEmT8BMfSdIzaXbrnX+4h5187J/2Ta\neX8l7ANYC2yI5iPp830nv7YeMaIpn+akRMP6gzI2A2jJSDlvv+Oi1TdiLehqDcK2\nc6YDcaQkiaWHbbXTlG8xnZtGP3VlpcGNWIw3YE6heUZTzBLLbczcvYSogAJCL7xD\nXQqzygXJEO01TjThT3RaGYZwo5UY3KzzQ2xjOjKtVO21Zk61FKCAaav54vJtisz4\nbSFj0yOvAgMBAAECggEAM3yXi9/1kIlemNIffhZj05UzGK1GMaMQqYP/rJKeYmA9\ngvLqWjpPVhE/uLS0D1C3mFpZ7X800HMdqiS9MSgMfRq9VXPdNvnvSIru/BotB5K4\njdIsfHBJvroXGCaS4DUOKkvE4/npZ74guzIuu6LU5VR/JID8PlwzFn2wSBRAnFBn\nCiI7cCQGUSeBbUQrkU2uNiMhqvripz+uxi5jwLtcEbDAsjcQvtQIUegLJAPv+1Vm\ngQhYa8dHfMI4zcyg/J6dJtkJ6jQQPPQd5THwgGN5kmifg/+50MaElcLZC4euH+QH\n9VkNIjpenXyEkyI0ahng5Dgx6fpNmC6sIu0SflSr4QKBgQD43QA1RXG00roK3TyD\nZDZGNxXOAtB5gT1R7mYxfgek/3tvLJXTs6US+j0w6QeAAEn+P6vL68WiE+XcNOpy\nlut4pueQELjeMmjcnCbGU8bqbta1vZrMtK5xhRGrKk3uxvOzCyJU/M1XXPfCfsJA\nCSWSNQzP10Polyu3CAYsAuDBlwKBgQC8yZ37I69nww5LctUJCYsDmFcgU9s5d/ju\nH7o4d4C1eV2ZeklDl3j3KM60Ntud9zQG8DxBeiQjbrmgiK5ZF/igmlV8P1zz+6qK\niJwxPUlzGdBex35qiMx9VBPuWEk07ox/XAsc+sZKV8+tCtOD7qbcpC4vnnR+ZjoL\nXNm5p5RBqQKBgAJJNWlH3AWHMgJLifTDBOScOO0NhZC4KTIJeJLXz4Yqep3I0Q+C\nxO9psQoz+cepOQTG3PMglU4p1KCzM7wdusf+8H2YSbpwyBnOrWSA/IDGx94fgb6D\nol6UlFb4KoMY/MAWSBhzwgcdaYE13N7ttpSjPBzko1ENom8p+bSJyjq9AoGADvcA\ncebrQZNhr7NjlbrO7TMHPQXIq+6Jqf6T2WQHrNr5A3CBHD2GljkC4aAzmnr9AcvL\nSvluoexmBIaxI1jWGY0CV74CFUkOxLp9fx23k8spDEpOCA3d/9VJWyxeaTa7pmDa\ndKqgS0ZYrQPdrmidi4HsM1QhMd/SnBH5JFFXXDkCgYEA4Z/t4JN1FK/QC0adENmi\nway8vEvBYzGsP8kgAQWNgiTP4c/HNyDFxPn57ML/gyhu4S85VPB8bZWNr8L9KVo1\nwMOJSx3fM5j5gMbIqXXHpQMIFEfjFUTXxZKnY6LfJrX/2z0iAF9jPZ68/dnP136r\nxwzZw3Vp3eMCpObbF3IYPY4=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-28plj@biometric-attendance-953b9.iam.gserviceaccount.com",
    "client_id": "100032394159832155069",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-28plj%40biometric-attendance-953b9.iam.gserviceaccount.com"
  };
  
  const app = initializeApp({
    credential: cert(firebaseConfig)
  });
const db = getFirestore();



module.exports.student = db.collection('students')
module.exports.attendance = db.collection('attendance')

