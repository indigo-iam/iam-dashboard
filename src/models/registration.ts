export interface Registration {
  username: string;
  givenname: string;
  familyname: string;
  email: string;
  uuid: string;
  accountId: string;
  creationTime: number;
  status: string;
  notes?: string;
}
