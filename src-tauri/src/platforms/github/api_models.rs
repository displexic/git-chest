use std::collections::HashMap;

use serde::Deserialize;

#[derive(Deserialize)]
pub struct GitHubApiRepoOwner {
    pub login: String,
    pub id: i32,
    pub node_id: String,
    pub gravatar_id: String,
    pub r#type: String,
    pub site_admin: bool,
}

#[derive(Deserialize)]
pub struct GitHubApiRepoLicense {
    pub key: String,
    pub name: String,
    pub spdx_id: String,
    pub node_id: String,
}

#[derive(Deserialize)]
pub struct GitHubApiRepoOrg {
    pub login: String,
    pub id: i32,
    pub node_id: String,
    pub gravatar_id: String,
    pub r#type: String,
    pub site_admin: bool,
}

/// URL-related properties are not included.
#[derive(Deserialize)]
pub struct GitHubApiRepo {
    pub id: i32,
    pub node_id: String,
    pub name: String,
    pub full_name: String,
    pub private: bool,
    pub owner: GitHubApiRepoOwner,
    pub description: Option<String>,
    pub fork: bool,
    pub created_at: String,
    pub updated_at: String,
    pub pushed_at: String,
    pub homepage: Option<String>,
    pub size: i32,
    pub stargazers_count: i32,
    pub watchers_count: i32,
    pub language: String,
    pub has_issues: bool,
    pub has_projects: bool,
    pub has_downloads: bool,
    pub has_wiki: bool,
    pub has_pages: bool,
    pub has_discussions: bool,
    pub forks_count: i32,
    pub archived: bool,
    pub disabled: bool,
    pub open_issues_count: i32,
    pub license: GitHubApiRepoLicense,
    pub allow_forking: bool,
    pub is_template: bool,
    pub web_commit_signoff_required: bool,
    pub topics: Vec<String>,
    pub visibility: String,
    pub forks: i32,
    pub open_issues: i32,
    pub watchers: i32,
    pub default_branch: String,
    pub custom_properties: Option<HashMap<String, String>>,
    pub org: Option<GitHubApiRepoOrg>,
    pub network_count: i32,
    pub subscribers_count: i32,
}

#[derive(Deserialize)]
pub struct GitHubApiRepoTreeItem {
    pub path: String,
    /// 'tree' (directory) or 'blob' (file).
    pub mode: String,
    pub sha: String,
    pub r#type: String,
    pub size: Option<i32>,
}

/// The hierarchy between files in a Git repository.
#[derive(Deserialize)]
pub struct GitHubApiRepoTree {
    pub sha: String,
    pub tree: Vec<GitHubApiRepoTreeItem>,
    pub truncated: bool,
}

#[derive(Deserialize)]
pub struct GitHubApiUser {
    pub login: String,
    pub id: i32,
    pub node_id: String,
    pub avatar_url: String,
    pub gravatar_id: String,
    /// 'User' or 'Organization'
    pub r#type: String,
    pub site_admin: bool,
    pub name: Option<String>,
    pub company: Option<String>,
    pub blog: String,
    pub location: Option<String>,
    pub hireable: Option<bool>,
    pub bio: Option<String>,
    pub twitter_username: Option<String>,
    pub public_repos: i32,
    pub public_gists: i32,
    pub followers: i32,
    pub following: i32,
    pub created_at: String,
    pub updated_at: String,
}
