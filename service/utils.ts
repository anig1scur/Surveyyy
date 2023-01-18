import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// scrypt is callback based -- convert it to return promise
const scryptAsync = promisify(scrypt);

// could have made Password a namespace, since it's essentially an obj w/ 2 methods
export class Password {
  static async toHash(password: string) {
    // generate a salt (a random string)
    const salt = randomBytes(8).toString('hex');
    // do actual hashing process -- returns a buffer (like an array with raw data inside)
    // ts doesn't know what scryptAsync returns, so we add type assertion with 'as Buffer'
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    // return hashed result along with salt to be stored in DB
    return `${buf.toString('hex')}.${salt}`;
  }
  static async compare(storedPassword: string, suppliedPassword: string) {
    // storedPassword from DB is going to be the hashed-password.salt
    const [hashedPassword, salt] = storedPassword.split('.');
    // hash the plain-text suppliedPassword with extracted salt
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    // check if hashed suppliedPassword matches storedPassword w/o appended salt
    return buf.toString('hex') === hashedPassword;
  }
}
