// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

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
