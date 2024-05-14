export interface GroupRequest {
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

export interface PaginatedGroupRequests {
  totalResults: number;
  itemsPerPage: number;
  startIndex: number;
  Resources: GroupRequest[];
}

export interface JoinGroupRequest {
  notes: string;
  username: string;
  groupName: string;
}
