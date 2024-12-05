use serde::Serialize;
use tauri::{AppHandle, Emitter};

#[derive(Serialize)]
#[serde(rename_all = "snake_case")]
pub enum ToastLevel {
    Info,
    Success,
    Warning,
    Error,
}

#[derive(Serialize)]
pub struct Toast {
    title: String,
    description: Option<String>,
    level: ToastLevel,
}

impl Toast {
    #[allow(clippy::new_without_default)]
    pub fn new() -> Self {
        Self {
            title: String::new(),
            description: None,
            level: ToastLevel::Info,
        }
    }

    pub fn title(mut self, title: &str) -> Self {
        self.title = title.to_string();
        self
    }

    pub fn description(mut self, description: &str) -> Self {
        self.description = Some(description.to_string());
        self
    }

    pub fn info(mut self) -> Self {
        self.level = ToastLevel::Info;
        self
    }

    pub fn success(mut self) -> Self {
        self.level = ToastLevel::Success;
        self
    }

    pub fn warning(mut self) -> Self {
        self.level = ToastLevel::Warning;
        self
    }

    pub fn error(mut self) -> Self {
        self.level = ToastLevel::Error;
        self
    }

    pub fn send(&self, app: &AppHandle) {
        app.emit("add-toast", self).unwrap();
    }
}
