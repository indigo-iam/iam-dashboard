type Aup = {
  url: string;
  text?: string | null;
  description?: string | null;
  signatureValidityInDays: number;
  creationTime: string;
  lastUpdateTime?: string | null;
};

type Account = {
  uuid: string;
  username: string;
  name: string;
};

export interface AupSignature {
  aup: Aup;
  account: Account;
  signatureTime: string;
}
