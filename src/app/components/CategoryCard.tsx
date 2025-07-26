import React from "react";
import Image from "next/image";
import type { getTopCategoriesResponse } from "@/lib/types";

interface CategoryCardProps {
  category: getTopCategoriesResponse;
  formatViewers: (viewers: number) => string;
  index: number;
}

function CategoryCard({ category, formatViewers, index }: CategoryCardProps) {
  return (
    <div className="group cursor-pointer w-[140px] flex-shrink-0">
      <a href={`/category/${category.slug}`} className="block">
        {/* Category Image */}
        <div className="relative aspect-[3/4] rounded-md overflow-hidden mb-2 bg-[#232326]">
          <Image
            src={category.banner.src}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="140px"
          />

          {/* Index Number - Top Left */}
          <div className="absolute top-1.5 left-1.5 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-bold">
            {index}
          </div>

          {/* Mature Content Badge */}
          {category.is_mature && (
            <div className="absolute top-1.5 right-1.5 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded text-[10px]">
              18+
            </div>
          )}

          {/* Viewers Count Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-medium">
                {formatViewers(category.viewers)}
              </span>
            </div>
          </div>
        </div>

        {/* Category Info */}
        <div className="space-y-1">
          <h3 className="text-white font-medium text-xs group-hover:text-green-500 transition-colors line-clamp-2 leading-tight">
            {`${Math.round(category.viewers / 1000)}k watching`}
          </h3>
          {/* <h3 className="text-white font-medium text-xs group-hover:text-green-500 transition-colors line-clamp-2 leading-tight">
            {category.name}
          </h3> */}
          {category.tags && category.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {category.tags.slice(0, 2).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-gray-400 text-[10px] bg-[#232326] px-1.5 py-0.5 gap-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>
    </div>
  );
}

export default CategoryCard;
