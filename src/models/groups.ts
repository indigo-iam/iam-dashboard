export interface Group {
  id: string;
  meta: {
    created: string;
    lastModified: string;
    location: string;
    resourceType: string;
  };
  displayName: string;
  "urn:indigo-dc:scim:schemas:IndigoGroup": {
    parentGroup: string | null;
    description: string | null;
    labels: GroupLabel[] | null;
  };
}

export interface GroupLabel {
  prefix?: string;
  name: string;
  value?: string;
}

export interface GroupsSearchResponse {
  totalResults: number;
  itemsPerPage: number;
  startIndex: number;
  Resources: Group[];
}

export interface ManagedGroup {
  id: string;
  name: string;
  description?: string;
  parent?: string;
}

export type UnmanagedGroup = ManagedGroup;

export type ManagedGroupResponse = {
  id: string;
  username: string;
  managedGroups: ManagedGroup[];
  unmanagedGroups: ManagedGroup[];
};
