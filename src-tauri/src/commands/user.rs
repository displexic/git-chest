use tauri::State;

use crate::user::User;
use crate::{error::AppResult, state::AppState};

#[tauri::command(rename_all = "snake_case")]
pub async fn get_user(id: i64, state: State<'_, AppState>) -> AppResult<User> {
    let state = state.lock().await;
    let user = User::get(id, &state.pool).await?;
    Ok(user)
}

#[tauri::command(rename_all = "snake_case")]
pub async fn remove_user(id: i64, state: State<'_, AppState>) -> AppResult<()> {
    let state = state.lock().await;
    User::remove(id, &state.pool).await?;
    Ok(())
}
