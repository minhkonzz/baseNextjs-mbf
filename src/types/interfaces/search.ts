export interface SearchParamValueMap {
  [key: string]: string | number | boolean | null | undefined;
}

export interface BuildSearchUrlOptions {
  pathname: string;
  currentSearchParams?:
    | URLSearchParams
    | string
    | Record<string, string | string[] | undefined>;
  searchParams: SearchParamValueMap;
}

export interface SearchFilterOption {
  label: string;
  value: string;
}

// demo
export interface TelecommunicationsSearchFilters {
  keyword: string;
  service: string;
  status: string;
  publishedAt: string;
}

export interface TelecommunicationsSearchResult {
  id: string;
  title: string;
  description: string;
  service: string;
  status: string;
  publishedAt: string;
}
