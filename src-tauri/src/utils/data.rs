use tauri::http::HeaderMap;

use crate::error::{AppError, AppResult};

pub fn human_readable_size(bytes: usize) -> String {
    const KB: usize = 1024;
    const MB: usize = KB * 1024;
    const GB: usize = MB * 1024;
    const TB: usize = GB * 1024;

    if bytes >= TB {
        format!("{:.2} TB", bytes as f64 / TB as f64)
    } else if bytes >= GB {
        format!("{:.2} GB", bytes as f64 / GB as f64)
    } else if bytes >= MB {
        format!("{:.2} MB", bytes as f64 / MB as f64)
    } else if bytes >= KB {
        format!("{:.2} KB", bytes as f64 / KB as f64)
    } else {
        format!("{bytes} bytes")
    }
}

pub fn parse_header_num(headers: &HeaderMap, header_name: &str) -> AppResult<i64> {
    headers
        .get(header_name)
        .and_then(|val| val.to_str().ok())
        .and_then(|s| s.parse().ok())
        .ok_or_else(|| AppError::Custom(format!("Failed to parse header: {header_name}")))
}

pub fn parse_header<'a>(headers: &'a HeaderMap, header_name: &str) -> AppResult<&'a str> {
    headers
        .get(header_name)
        .and_then(|val| val.to_str().ok())
        .ok_or_else(|| AppError::Custom(format!("Failed to parse header: {header_name}")))
}

/// Calculate the progress percentage with an unknown total.
pub fn progress_percentage(index: usize, total: usize) -> u8 {
    if total == 0 {
        0 // Cannot divide by zero.
    } else {
        let percentage = ((index + 1) as f64 / total as f64) * 100.0;
        percentage.min(255.0) as u8
    }
}
