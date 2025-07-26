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
