import CryptoJS from 'crypto-js'

export const Auth = () => {
    var publicKey, privateKey, hash, encryption;
    var utcDate = Math.floor(new Date().getTime() / 1000);
    
    if (process.env.apikey !== undefined) {
        publicKey = process.env.apikey;
        privateKey = process.env.apiSecret;
    }

    var assemble = (publicKey + privateKey + utcDate);

    //Begin SHA-256 Encryption
    hash = CryptoJS.SHA256(assemble).toString();
    encryption = (hash.toString(CryptoJS.enc.Hex));

    return encryption
}
