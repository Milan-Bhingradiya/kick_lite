//-------------------------------------------------------------------------------------------------------------
//||||||||||||||||||||||| fetch stream data by category |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//--------------------------------------------------------------------------------------------------------------
export interface LivestreamUser {
  id: number;
  username: string;
  agreed_to_terms: boolean;
  email_verified_at: string;
  bio: string;
  country: string;
  state: string;
  city: string;
  instagram: string;
  twitter: string;
  youtube: string;
  discord: string;
  tiktok: string;
  facebook: string;
  profilepic: string;
}

export interface LivestreamChannel {
  id: number;
  user_id: number;
  slug: string;
  is_banned: boolean;
  playback_url: string;
  name_updated_at: string;
  vod_enabled: boolean;
  subscription_enabled: boolean;
  is_affiliate: boolean;
  can_host: boolean;
  user: LivestreamUser;
}

export interface LivestreamCategory {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  tags: string[];
  description: string | null;
  deleted_at: string | null;
  is_mature: boolean;
  is_promoted: boolean;
  viewers: number;
  category: Category;
}

export interface LivestreamThumbnail {
  srcset: string;
  src: string;
}

export interface Livestream {
  id: number;
  slug: string;
  channel_id: number;
  created_at: string;
  session_title: string;
  is_live: boolean;
  risk_level_id: number | null;
  start_time: string;
  source: string | null;
  twitch_channel: string | null;
  duration: number;
  language: string;
  is_mature: boolean;
  viewer_count: number;
  order: number;
  tags: string[];
  thumbnail: LivestreamThumbnail;
  viewers: number;
  channel: LivestreamChannel;
  categories: LivestreamCategory[];
}

export interface getLivestreamsDataForCardResponse {
  current_page: number;
  data: Livestream[];
}

//-------------------------------------------------------------------------------------------------------------
//||||||||||||||||||||||| category only and with slug |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//--------------------------------------------------------------------------------------------------------------
export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export interface Banner {
  src: string;
  srcset: string;
}

export interface getTopCategoriesResponse {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  tags: string[];
  description: string | null;
  deleted_at: string | null;
  is_mature: boolean;
  is_promoted: boolean;
  viewers: number;
  banner: Banner;
  category: Category;
}

export interface getCategoryInfoFromNameResponse {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  tags: string[];
  description: string | null;
  deleted_at: string | null;
  is_mature: boolean;
  is_promoted: boolean;
  viewers: number;
  banner: Banner;
  category: Category;
}

//-------------------------------------------------------------------------------------------------------------
//||||||||||||||||||||||| get basic channel info and live or not  |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//--------------------------------------------------------------------------------------------------------------

export interface ChannelCategory {
  id: number;
  name: string;
  thumbnail: string;
}

export interface ChannelStream {
  url: string;
  key: string;
  is_live: boolean;
  is_mature: boolean;
  language: string;
  start_time: string;
  viewer_count: number;
  thumbnail: string;
}

export interface ChannelData {
  broadcaster_user_id: number;
  slug: string;
  channel_description: string;
  banner_picture: string;
  stream: ChannelStream;
  stream_title: string;
  category: Category;
}

// Define the main response type.
export interface ChannelInfoResponse {
  data: ChannelData[];
  message: string;
}

//-------------------------------------------------------------------------------------------------------------
//||||||||||||||||||||||| this is for List all video of Channel |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//--------------------------------------------------------------------------------------------------------------

// Reusable interfaces for nested objects
export interface Thumbnail {
  src: string;
  srcset: string;
}

export interface VideoDetails {
  id: number;
  live_stream_id: number;
  slug: string | null;
  thumb: string | null;
  s3: string | null;
  trading_platform_id: string | null;
  created_at: string;
  updated_at: string;
  uuid: string;
  views: number;
  deleted_at: string | null;
  is_pruned: boolean;
  is_private: boolean;
  status: string;
}

export interface StreamCategoryBanner {
  responsive: string;
  url: string;
}

export interface StreamCategory {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  tags: string[];
  description: string | null;
  deleted_at: string | null;
  is_mature: boolean;
  is_promoted: boolean;
  viewers: number;
  banner: StreamCategoryBanner;
}

// Interface for a single stream session (can be live or a VOD)
export interface StreamSession {
  id: number;
  slug: string; // A unique identifier for this specific stream session, which is different from the channel slug.
  channel_id: number;
  created_at: string;
  session_title: string;
  is_live: boolean;
  risk_level_id: string | null;
  start_time: string;
  source: string; // The HLS (.m3u8) URL for the video content.
  twitch_channel: string | null;
  duration: number;
  language: string;
  is_mature: boolean;
  viewer_count: number;
  tags: string[];
  thumbnail: Thumbnail;
  views: number;
  video: VideoDetails;
  categories: StreamCategory[];
}

// The main type for the API response which contains an array of stream sessions.
export type ChannelAllVideosResponse = StreamSession[];
