use sqlx::{prelude::FromRow, SqlitePool};
use tokio::time::Instant;
use tracing::{error, info};

use crate::{error::AppResult, utils::dirs::DataPath};

#[derive(FromRow)]
pub struct UserAvatar {
    id: i64,
    ext: Option<String>,
}

impl UserAvatar {
    pub async fn get(user_id: i64, pool: &SqlitePool) -> AppResult<Self> {
        let start = Instant::now();

        let query = "SELECT id, ext FROM user_avatar WHERE user_id = ?";
        let avatar = sqlx::query_as::<_, Self>(query)
            .bind(user_id)
            .fetch_one(pool)
            .await
            .map_err(|e| {
                error!("{:?}", e);
                "Error getting user avatar from database"
            })?;

        info!("got user avatar in {:?}", start.elapsed());

        Ok(avatar)
    }

    pub fn path_str(&self) -> String {
        let ext_str = self
            .ext
            .as_ref()
            .map(|e| format!(".{e}"))
            .unwrap_or("".to_string());
        let path = DataPath::Avatar(&format!("{}{ext_str}", self.id)).path();
        path.to_str().unwrap().to_string()
    }
}
