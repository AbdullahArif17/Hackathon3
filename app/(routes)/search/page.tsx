"use client";

import { Suspense } from "react";
import SearchResults from "@/app/multiy-components/search/SearchResults";

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Loading search results...</p>}>
      <SearchResults />
    </Suspense>
  );
}
