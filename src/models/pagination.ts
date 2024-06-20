export type Paginated<T> = {
  totalResults: number;
  itemsPerPage: number;
  startIndex: number;
  Resources: T[];
};
