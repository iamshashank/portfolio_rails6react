class Api::V1::YoutubeController < ApplicationController
  include YoutubeClient

  def videos
    data = Rails.cache.fetch("youtube", expires_in: 4.hour) do
      {videos: get_recent_videos, stats: subscriber_count}
    end
    render json: { videos: data[:videos], stats: data[:stats] }
  end
end
