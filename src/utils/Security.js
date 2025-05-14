import CryptoJS from "crypto-js";

export function encryptData(data) {
  const token = sessionStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const encryption_key = decodedToken.encryption_key;

  let encryptData = data;

  if(typeof data !== "string"){
    encryptData = JSON.stringify(data)
  }

	const derived_key = CryptoJS.enc.Base64.parse(encryption_key);
	const iv = CryptoJS.enc.Utf8.parse(encryption_key.slice(0, 16));

	const encryptionOptions = {
		iv: iv,
		mode: CryptoJS.mode.CBC,
	};

	const encrypted = CryptoJS.AES.encrypt(
		encryptData,
		derived_key,
		encryptionOptions
	).toString();

  return encrypted;
}

export function decryptData(encryptedData) {
  const token = sessionStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const encryption_key = decodedToken.encryption_key;

	const derived_key = CryptoJS.enc.Base64.parse(encryption_key);
	const iv = CryptoJS.enc.Utf8.parse(encryption_key.slice(0, 16));

	const encryptionOptions = {
		iv: iv,
		mode: CryptoJS.mode.CBC,
	};

  const decrypted = CryptoJS.AES.decrypt(
    {
        ciphertext: CryptoJS.enc.Base64.parse(encryptedData),
    },
    derived_key,
    encryptionOptions
  );
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
}

export function encodeString(input) {
  const encodedString = btoa(input);
  return encodedString;
}
