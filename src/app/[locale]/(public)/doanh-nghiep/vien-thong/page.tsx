import configs from "@/constants/config";
import SegmentPage from "@/shared/layout/segment-page";

import type { PageProps } from "@/types/interfaces/common";
import { createSegmentMetadata } from "@/lib/seo/create-page-metadata";

import { TelecommunicationsSearchDemo } from "./telecommunications-search-demo";

export const generateMetadata = createSegmentMetadata(
  "telecommunications",
  `/${configs.BUSINESS_PATH_SEGMENT}/vien-thong`
);

export default function TelecommunicationsPage({ params }: PageProps) {
  return (
    <SegmentPage params={params} translationKey="telecommunications">
      <TelecommunicationsSearchDemo />
    </SegmentPage>
  );
}
