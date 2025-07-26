"use client";
import TopCategories from "./components/TopCategories";
import { getTopCategoriesNames } from "@/lib/interaction/dataGetter";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { Category } from "@/lib/types";
import StreamCard from "./components/StreamCard";
import LivestreamsRow from "./components/LivestreamsCardRow";

export default function Home() {
  const { data } = useQuery<Category[]>({
    queryKey: ["top-categories-names"],
    queryFn: getTopCategoriesNames,
  });

  return (
    <div>
      <TopCategories></TopCategories>

      {data &&
        data.map((category) => (
          <LivestreamsRow
            key={category.id}
            categorySlug={category.slug}
            categoryName={category.name}
          />
        ))}
    </div>
  );
}
