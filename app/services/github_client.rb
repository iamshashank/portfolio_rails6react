module GithubClient
  def git_client
    Octokit::Client.new(access_token: ENV['OAUTH_ACCESS_TOKEN'])
  end
end