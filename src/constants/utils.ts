import type {
  BuildSearchUrlOptions,
  SearchFilterOption,
  SearchParamValueMap,
  TelecommunicationsSearchFilters,
  TelecommunicationsSearchResult,
} from "@/types/interfaces/search";

// demo
export const TELECOMMUNICATIONS_SEARCH_DEFAULT_VALUES: TelecommunicationsSearchFilters =
  {
    keyword: "",
    service: "",
    status: "",
    publishedAt: "",
  };

export const TELECOMMUNICATIONS_SERVICE_OPTIONS: SearchFilterOption[] = [
  { label: "Tất cả dịch vụ", value: "all" },
  { label: "5G doanh nghiệp", value: "5g" },
  { label: "Truyền dẫn", value: "transmission" },
  { label: "Internet cáp quang", value: "fiber" },
];

export const TELECOMMUNICATIONS_STATUS_OPTIONS: SearchFilterOption[] = [
  { label: "Tất cả trạng thái", value: "all" },
  { label: "Đang triển khai", value: "active" },
  { label: "Đang tư vấn", value: "consulting" },
  { label: "Sắp ra mắt", value: "upcoming" },
];

export const TELECOMMUNICATIONS_SEARCH_RESULTS: TelecommunicationsSearchResult[] =
  [
    {
      id: "biz-5g-pro",
      title: "Gói 5G Business Pro",
      description:
        "Kết nối tốc độ cao cho đội ngũ di động, ưu tiên băng thông và quản trị tập trung.",
      service: "5g",
      status: "active",
      publishedAt: "2026-06-12",
    },
    {
      id: "metro-link",
      title: "Metro Link doanh nghiệp",
      description:
        "Kênh truyền dẫn ổn định cho văn phòng, chi nhánh và trung tâm dữ liệu.",
      service: "transmission",
      status: "consulting",
      publishedAt: "2026-05-26",
    },
    {
      id: "fiber-cloud",
      title: "Fiber Cloud Connect",
      description:
        "Internet cáp quang cho doanh nghiệp vừa và nhỏ với SLA rõ ràng.",
      service: "fiber",
      status: "active",
      publishedAt: "2026-06-18",
    },
    {
      id: "private-5g",
      title: "Private 5G Campus",
      description:
        "Mô hình mạng riêng cho nhà máy, khu công nghiệp và campus thông minh.",
      service: "5g",
      status: "upcoming",
      publishedAt: "2026-07-02",
    },
  ];

// hết phần demo

function normalizeSearchParamValue(
  value: string | number | boolean | null | undefined
): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  const normalizedValue = String(value).trim();

  if (!normalizedValue) {
    return null;
  }

  return normalizedValue;
}

function createUrlSearchParams(
  currentSearchParams?: BuildSearchUrlOptions["currentSearchParams"]
): URLSearchParams {
  if (!currentSearchParams) {
    return new URLSearchParams();
  }

  if (currentSearchParams instanceof URLSearchParams) {
    return new URLSearchParams(currentSearchParams.toString());
  }

  if (typeof currentSearchParams === "string") {
    return new URLSearchParams(currentSearchParams);
  }

  const urlSearchParams = new URLSearchParams();

  Object.entries(currentSearchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        const normalizedValue = normalizeSearchParamValue(item);

        if (normalizedValue) {
          urlSearchParams.append(key, normalizedValue);
        }
      });

      return;
    }

    const normalizedValue = normalizeSearchParamValue(value);

    if (normalizedValue) {
      urlSearchParams.set(key, normalizedValue);
    }
  });

  return urlSearchParams;
}

export function buildSearchUrl({
  pathname,
  currentSearchParams,
  searchParams,
}: BuildSearchUrlOptions): string {
  const nextSearchParams = createUrlSearchParams(currentSearchParams);

  Object.entries(searchParams).forEach(([key, value]) => {
    const normalizedValue = normalizeSearchParamValue(value);

    if (!normalizedValue) {
      nextSearchParams.delete(key);
      return;
    }

    nextSearchParams.set(key, normalizedValue);
  });

  const queryString = nextSearchParams.toString();

  if (!queryString) {
    return pathname;
  }

  return `${pathname}?${queryString}`;
}

export function getSearchParamsState<T extends object>(
  currentSearchParams: BuildSearchUrlOptions["currentSearchParams"],
  defaultValues: T
): T {
  const nextSearchParams = createUrlSearchParams(currentSearchParams);
  const nextState = { ...defaultValues } as T;

  Object.entries(defaultValues).forEach(([key, value]) => {
    const searchParamValue = nextSearchParams.get(key);

    (nextState as Record<string, unknown>)[key] = searchParamValue ?? value;
  });

  return nextState;
}
