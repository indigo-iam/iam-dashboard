export interface IamGroupRequestResource {
  uuid: string;
  userUuid: string;
  userFullName?: string;
  username: string;
  status: string;
  notes?: string;
  groupName: string;
  groupUuid: string;
  creationTime: number;
  latestUpdateTime: number;
}

export interface IamGroupRequests {
  totalResults: number;
  itemsPerPage: number;
  startIndex: number;
  Resources: IamGroupRequestResource[];
}
