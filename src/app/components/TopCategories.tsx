"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTopCategories } from "@/lib/interaction/dataGetter";
import CategoryCard from "./CategoryCard";
import type { Category, getTopCategoriesResponse } from "@/lib/types";

function TopCategories() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["top-categories"],
    queryFn: getTopCategories,
  });

  const categories: getTopCategoriesResponse[] = Array.isArray(data)
    ? data
    : [];

  return (
    <div className="bg-[#0f0f0f] px-6 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-bold">Top Categories</h2>
          <button className="text-green-500 hover:text-green-400 font-medium text-sm">
            Show All
          </button>
        </div>

        {/* Loading/Error States */}
        {isLoading && (
          <div className="text-gray-400 py-8 text-center">Loading...</div>
        )}
        {isError && (
          <div className="text-red-500 py-8 text-center">
            Failed to load categories.
          </div>
        )}

        {/* Categories Grid/Scroll Container */}
        {!isLoading && !isError && (
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 min-w-max">
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  formatViewers={() => ""}
                  index={index + 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopCategories;
