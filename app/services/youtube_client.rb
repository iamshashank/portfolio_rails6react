require 'rest-client'
module YoutubeClient
  def get_recent_videos
    res = RestClient.get("https://www.googleapis.com/youtube/v3/search?channelId=#{ENV['YOUTUBE_CHANNEL_ID']}&maxResults=5&order=date&type=video&key=#{ENV['YOUTUBE_API_KEY']}")
    JSON.parse(res.body)["items"].map{|v| v["id"]["videoId"] }
  end

  def subscriber_count
    res = RestClient.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=#{ENV['YOUTUBE_CHANNEL_ID']}&key=#{ENV['YOUTUBE_API_KEY']}")
    JSON.parse(res.body)["items"][0]["statistics"]
  end
end
