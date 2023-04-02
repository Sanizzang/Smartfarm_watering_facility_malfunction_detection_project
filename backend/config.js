import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined){
    const value = process.env[key] || defaultValue;
    if(value == null){
        throw new Error(`Key ${key} is undefined`);
    }
    return value;
}

export const config = {
    jwt: {
        secretKey: required('JWT_SECRET', '2gKE#$P@hIH4#vwhGZd*PA7FAlOxyDoR'),
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
    },
    bcrypt:{
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12))
    },
    host: {
        port: parseInt(required('HOST_PORT', 8080)),
    },
    db: {
        host: required('DB_HOST', 'localhost'),
        user: required('DB_USER', 'root'),
        database: required('DB_DATABASE', 'smartfarm'),
        password: required('DB_PASSWORD', 'kk4732'),
    },
    port: parseInt(required('PORT', 8080)),
}