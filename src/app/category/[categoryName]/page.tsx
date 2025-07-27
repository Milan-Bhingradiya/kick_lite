"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getCategoryInfoFromName,
  getLivestreamsDataForCard,
} from "@/lib/interaction/dataGetter";
import StreamCard from "@/app/components/StreamCard";
import Image from "next/image";
import { getCategoryInfoFromNameResponse } from "@/lib/types";

function CategoryPage() {
  const params = useParams();
  const categoryName =
    typeof params?.categoryName === "string" ? params.categoryName : "";

  const { data: categoryInfo, isLoading: infoLoading } = useQuery({
    queryKey: ["category-info", categoryName],
    queryFn: () => getCategoryInfoFromName(categoryName),
    enabled: !!categoryName,
  });

  const { data: streamsData, isLoading: streamsLoading } = useQuery({
    queryKey: ["category-streams", categoryName],
    queryFn: () => getLivestreamsDataForCard(categoryName, 20, "featured"),
    enabled: !!categoryName,
  });

  const streams = Array.isArray(streamsData?.data) ? streamsData.data : [];
  const info: getCategoryInfoFromNameResponse | undefined = categoryInfo;

  return (
    <div className="w-full px-4 py-8">
      <div className="flex gap-8 items-start mb-8">
        {/* Category Image */}
        <div className="w-64 h-64 relative flex-shrink-0">
          <Image
            src={info?.banner?.src || "/default-thumbnail.png"}
            alt={info?.name || categoryName}
            className="w-full h-full object-cover rounded-xl border border-gray-800"
            width={256}
            height={256}
          />
        </div>
        {/* Category Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <span>{info?.category?.icon || ""}</span>
            {info?.name || categoryName}
          </h1>
          <div className="text-gray-400 mb-4">
            {info?.description || "No description available."}
          </div>
          <div className="flex gap-4 mb-4">
            <div className="text-green-400 font-semibold">
              {info?.viewers ?? 0} Watching
            </div>
            {/* Followers not available in API response, remove for now */}
          </div>
          <div className="flex gap-2 flex-wrap">
            {(info?.tags ?? []).map((tag: string) => (
              <span
                key={tag}
                className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Streams Row */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Live Streams</h2>
        {streamsLoading ? (
          <div className="text-gray-400 py-8 text-center">
            Loading streams...
          </div>
        ) : streams.length === 0 ? (
          <div className="text-gray-400 py-8 text-center">
            No live streams found.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {streams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
