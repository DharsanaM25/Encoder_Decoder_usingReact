export type CipherMethod = 'base64' | 'url' | 'html' | 'caesar' | 'binary' | 'hex' | 'json';

export interface HistoryItem {
  id: number;
  input: string;
  output: string;
  method: CipherMethod;
  mode: 'encode' | 'decode';
  shift?: number;
  timestamp: string;
}