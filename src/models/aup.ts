export type AUP = {
  url: string;
  text?: string;
  description?: string;
  signatureValidityInDays: number;
  creationTime: string;
  lastUpdateTime: string;
  aupRemindersInDays: string;
};

export type AUPPatch = {
  url?: string;
  signatureValidityInDays?: number;
  aupRemindersInDays?: string;
};

export type AUPCreate = {
  url: string;
  signatureValidityInDays: number;
  aupRemindersInDays?: string;
};
