import { CipherMethod } from '../types';

// Base64 encoding/decoding
const base64Encode = (text: string): string => {
  return btoa(encodeURIComponent(text));
};

const base64Decode = (encoded: string): string => {
  try {
    return decodeURIComponent(atob(encoded));
  } catch (e) {
    throw new Error('Invalid Base64 format');
  }
};

// URL encoding/decoding
const urlEncode = (text: string): string => {
  return encodeURIComponent(text);
};

const urlDecode = (encoded: string): string => {
  try {
    return decodeURIComponent(encoded);
  } catch (e) {
    throw new Error('Invalid URL encoded format');
  }
};

// HTML encoding/decoding
const htmlEncode = (text: string): string => {
  const element = document.createElement('div');
  element.innerText = text;
  return element.innerHTML;
};

const htmlDecode = (encoded: string): string => {
  const element = document.createElement('div');
  element.innerHTML = encoded;
  return element.innerText;
};

// Caesar cipher encoding/decoding
const caesarEncode = (text: string, shift: number): string => {
  if (shift < 0) {
    shift = (26 + (shift % 26)) % 26; // Ensure shift is positive
  }

  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    
    // Handle uppercase letters
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 + shift) % 26) + 65);
    }
    
    // Handle lowercase letters
    if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 + shift) % 26) + 97);
    }
    
    // Return unchanged for non-alphabetic characters
    return char;
  }).join('');
};

const caesarDecode = (encoded: string, shift: number): string => {
  // Decoding is just encoding with the shift in the opposite direction
  return caesarEncode(encoded, 26 - (shift % 26));
};

// Binary encoding/decoding
const binaryEncode = (text: string): string => {
  return text.split('').map(char => {
    return char.charCodeAt(0).toString(2).padStart(8, '0');
  }).join(' ');
};

const binaryDecode = (encoded: string): string => {
  try {
    return encoded.split(' ').map(binary => {
      return String.fromCharCode(parseInt(binary, 2));
    }).join('');
  } catch (e) {
    throw new Error('Invalid binary format');
  }
};

// Hexadecimal encoding/decoding
const hexEncode = (text: string): string => {
  return Array.from(text).map(char => {
    return char.charCodeAt(0).toString(16).padStart(2, '0');
  }).join(' ');
};

const hexDecode = (encoded: string): string => {
  try {
    return encoded.split(' ').map(hex => {
      return String.fromCharCode(parseInt(hex, 16));
    }).join('');
  } catch (e) {
    throw new Error('Invalid hexadecimal format');
  }
};

// JSON formatting/minification
const jsonFormat = (text: string): string => {
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    throw new Error('Invalid JSON format');
  }
};

const jsonMinify = (text: string): string => {
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed);
  } catch (e) {
    throw new Error('Invalid JSON format');
  }
};

// Main encoder function
export const encodeText = (text: string, method: CipherMethod, shift: number = 3): string => {
  switch (method) {
    case 'base64':
      return base64Encode(text);
    case 'url':
      return urlEncode(text);
    case 'html':
      return htmlEncode(text);
    case 'caesar':
      return caesarEncode(text, shift);
    case 'binary':
      return binaryEncode(text);
    case 'hex':
      return hexEncode(text);
    case 'json':
      return jsonFormat(text);
    default:
      return text;
  }
};

// Main decoder function
export const decodeText = (text: string, method: CipherMethod, shift: number = 3): string => {
  switch (method) {
    case 'base64':
      return base64Decode(text);
    case 'url':
      return urlDecode(text);
    case 'html':
      return htmlDecode(text);
    case 'caesar':
      return caesarDecode(text, shift);
    case 'binary':
      return binaryDecode(text);
    case 'hex':
      return hexDecode(text);
    case 'json':
      return jsonMinify(text);
    default:
      return text;
  }
};