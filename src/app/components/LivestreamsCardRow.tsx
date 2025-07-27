"use clinet";
import StreamCard from "./StreamCard";
import { useQuery } from "@tanstack/react-query";
import type {
  getLivestreamsDataForCardResponse,
  Livestream,
} from "@/lib/types";

interface CreativeLivestreamsRowProps {
  categorySlug: string;
  categoryName: string;
}

import { getLivestreamsDataForCard } from "@/lib/interaction/dataGetter";

function LivestreamsRow({
  categorySlug,
  categoryName,
}: CreativeLivestreamsRowProps) {
  const { data, isLoading, isError } =
    useQuery<getLivestreamsDataForCardResponse>({
      queryKey: ["livestreams", categorySlug],
      queryFn: () => getLivestreamsDataForCard(categorySlug, 14, "featured"),
    });
  console.log(data);
  const streams: Livestream[] = data?.data || [];

  return (
    <div className="px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-bold">
            {categoryName} Streams
          </h2>
        </div>
        {isLoading && (
          <div className="text-gray-400 py-8 text-center">Loading...</div>
        )}
        {isError && (
          <div className="text-red-500 py-8 text-center">
            Failed to load streams.
          </div>
        )}
        {!isLoading && !isError && (
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 min-w-max">
              {streams &&
                streams.map((stream: Livestream) => (
                  <StreamCard
                    key={stream.id}
                    stream={stream}
                    onClick={() => {
                      if (stream.channel?.slug) {
                        window.location.href = `/${stream.channel.slug}`;
                      }
                    }}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LivestreamsRow;
