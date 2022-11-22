export interface EntityApiServiceOptions
  extends SortOptions,
    PaginationOptions,
    FullTextSearchOptions {}

/** Interface segregation */

interface SortOptions {
  sort: string;
  order: `asc` | `desc`;
}

interface PaginationOptions {
  page: number;
  limit: number;
}

interface FullTextSearchOptions {
  query: string;
}
