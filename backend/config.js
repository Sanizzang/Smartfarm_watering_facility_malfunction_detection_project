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