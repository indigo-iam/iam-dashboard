export interface Aup {
  url: string;
  text?: string | null;
  description?: string | null;
  signatureValidityInDays: number;
  creationTime: string;
  lastUpdateTime?: string | null;
}
