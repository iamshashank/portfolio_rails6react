class Api::V1::GithubController < ApplicationController
  require 'octokit'
  include GithubClient

  def total_repos
    output = Rails.cache.fetch("github1", expires_in: 1.hour) do
      client = git_client
      repo_count = client.repositories.count
      last_5_repo = client.repos({}, query: {type: 'owner', sort: 'desc'}).first(15).map{ |r| {id: r.id, language: r.language, name: r.name, html_url: r[:html_url], description: r[:description] } }
      organizations = client.organizations.map{ |org| {login: org[:login], url: org[:url], avatar_url: org[:avatar_url], description: org[:description]} }
      languages = []
      last_5_repo.map! do |r|
        lang = client.languages(r[:id]).map{|a| a[0] }
        languages += lang
        r.merge!({languages: lang})
      end

      {
        status: true,
        repo_count: repo_count,
        last_5_repo: last_5_repo,
        organizations: organizations,
        company: client.user.company,
        followers: client.user.followers,
        languages: languages.uniq
      }
    end

    Rails.logger.info { output }
    render json: output
  rescue => e
    Rails.logger.error {e}
  end
end
