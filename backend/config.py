from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql://clipcraft:clipcraft@localhost:5432/clipcraft"
    cors_origins: str = "http://localhost:3000"
    firebase_project_id: str | None = None
    whisper_api_key: str | None = None

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
