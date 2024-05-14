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
    labels: string | null;
  };
}

export interface GroupsSearchResponse {
  totalResults: number;
  itemsPerPage: number;
  startIndex: number;
  Resources: Group[];
}
