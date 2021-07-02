var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3EfeqCEBOLA',
    iv = crypto.randomBytes(16);

    let key = crypto.createHash('sha256').update(String(password)).digest('base64').substr(0, 32);
export function encrypt(buffer){
  var cipher = crypto.createCipheriv(algorithm,key,iv)
  var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
  return crypted;
}
 
export function decrypt(buffer){
  var decipher = crypto.createDecipheriv(algorithm,key,iv)
  var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
  return dec;
}
 
// var hw = encrypt(new Buffer("hello world", "utf8"))
// // outputs hello world
// console.log(decrypt(hw).toString('utf8'));