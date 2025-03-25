export type AccountSelector = {};

export type GroupSelector = {
  uuid: string;
  name?: string;
  location?: string;
};

export interface ScopePolicy {
  id: number;
  description: string;
  creationTime: Date;
  lastUpdateTime: Date;
  rule: "PERMIT" | "DENY";
  matchingPolicy: "EQ" | "REGEXP" | "PATH";
  group?: GroupSelector;
  account?: AccountSelector;
  scopes: [string];
}
