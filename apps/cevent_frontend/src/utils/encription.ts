import Cryptr from 'cryptr';

export function encrypt(text: string): string {
  const secretKey = process.env.NEXTAUTH_SECRET;
  if (!secretKey) {
    throw new Error('Missing NEXTAUTH_SECRET environment variable');
  }
  const cryptr = new Cryptr(secretKey);
  const encryptedString = cryptr.encrypt(text);
  return encryptedString;
}

export function decrypt(encryptedString: string): string {
  const secretKey = process.env.NEXTAUTH_SECRET;
  if (!secretKey) {
    throw new Error('Missing NEXTAUTH_SECRET environment variable');
  }
  const cryptr = new Cryptr(secretKey);
  const text = cryptr.decrypt(encryptedString);
  return text;
}
