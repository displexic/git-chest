use std::str::FromStr;

use chrono::Utc;
use serde::Serialize;
use sqlx::{prelude::FromRow, SqlitePool};
use tokio::time::Instant;
use tracing::{error, info};

use crate::{
    error::AppResult,
    platforms::{
        github::{get_github_user, models::GitHubUserData},
        Platform,
    },
};
use avatar::UserAvatar;

pub mod avatar;

#[derive(FromRow)]
pub struct DbUser {
    user: String,
    platform: String,
    created_at: String,
    updated_at: String,
}

#[derive(Serialize)]
#[serde(tag = "type", content = "data")]
#[allow(clippy::large_enum_variant)]
pub enum PlatformUserData {
    Bitbucket,
    GitHub(GitHubUserData),
    GitLab,
    Gitea,
}

#[derive(Serialize)]
pub struct User {
    user: String,
    created_at: String,
    updated_at: String,
    avatar: String,
    platform_user: PlatformUserData,
}

impl User {
    pub async fn add(user: &str, platform: &str, pool: &SqlitePool) -> AppResult<i64> {
        let user_query =
            "INSERT INTO user (platform, user, created_at, updated_at) VALUES (?, ?, ?, ?)";
        let user_id = sqlx::query(user_query)
            .bind(platform)
            .bind(user)
            .bind(Utc::now().to_rfc3339())
            .bind(Utc::now().to_rfc3339())
            .execute(pool)
            .await
            .map_err(|e| {
                error!("{:?}", e);
                "Error adding repository data into database"
            })?
            .last_insert_rowid();
        Ok(user_id)
    }

    pub async fn exists(user: &str, pool: &SqlitePool) -> AppResult<bool> {
        let query = "SELECT id FROM user WHERE user = ?";
        let exists = sqlx::query(query)
            .bind(user)
            .fetch_optional(pool)
            .await
            .map_err(|e| {
                error!("{:?}", e);
                "Error checking if user exists in database"
            })?;
        Ok(exists.is_some())
    }

    pub async fn get(id: i64, pool: &SqlitePool) -> AppResult<Self> {
        let start = Instant::now();

        let query = "SELECT user, platform, created_at, updated_at FROM user WHERE id = ?";
        let user = sqlx::query_as::<_, DbUser>(query)
            .bind(id)
            .fetch_one(pool)
            .await
            .map_err(|e| {
                error!("{:?}", e);
                "Error getting user from database"
            })?;

        let avatar = UserAvatar::get(id, pool).await?.path_str();

        let platform_user = match Platform::from_str(&user.platform)? {
            Platform::Bitbucket => PlatformUserData::Bitbucket,
            Platform::GitHub => {
                let github_user = get_github_user(id, pool).await?;
                PlatformUserData::GitHub(github_user)
            }
            Platform::GitLab => PlatformUserData::GitLab,
            Platform::Gitea => PlatformUserData::Gitea,
        };

        info!("got full user \"{}\" in {:?}", user.user, start.elapsed());

        Ok(Self {
            user: user.user,
            created_at: user.created_at,
            updated_at: user.updated_at,
            avatar,
            platform_user,
        })
    }

    pub async fn remove(id: i64, pool: &SqlitePool) -> AppResult<()> {
        let start = Instant::now();
        let query = "DELETE FROM user WHERE id = ?";
        sqlx::query(query)
            .bind(id)
            .execute(pool)
            .await
            .map_err(|e| {
                error!("{:?}", e);
                "Error deleting user from database"
            })?;

        info!("deleted user \"{id}\" in {:?}", start.elapsed());
        Ok(())
    }
}
