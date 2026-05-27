from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    firebase_uid: str = Field(min_length=4, max_length=128)
    email: EmailStr
    display_name: str | None = Field(default=None, max_length=120)


class UserLogin(BaseModel):
    firebase_uid: str = Field(min_length=4, max_length=128)


class UserRead(BaseModel):
    id: int
    firebase_uid: str
    email: EmailStr
    display_name: str | None

    model_config = {"from_attributes": True}


class ProjectCreate(BaseModel):
    user_id: int
    title: str = Field(min_length=1, max_length=160)


class ProjectRead(BaseModel):
    id: int
    user_id: int
    title: str
    status: str
    aspect_ratio: str

    model_config = {"from_attributes": True}


class VideoCreate(BaseModel):
    project_id: int
    source_url: str = Field(min_length=8)
    trim_start: float = 0
    trim_end: float | None = None


class VideoRead(BaseModel):
    id: int
    project_id: int
    source_url: str
    trim_start: float
    trim_end: float | None
    captions: list[dict] | None
    overlays: list[dict] | None
    music_track: str | None
    export_url: str | None

    model_config = {"from_attributes": True}


class TrimUpdate(BaseModel):
    trim_start: float = Field(ge=0)
    trim_end: float = Field(gt=0)


class OverlayCreate(BaseModel):
    text: str = Field(min_length=1, max_length=120)
    start: float = Field(ge=0)
    end: float = Field(gt=0)
    style: dict = Field(default_factory=dict)


class MusicUpdate(BaseModel):
    track: str = Field(min_length=1, max_length=160)


class CaptionRequest(BaseModel):
    language: str = "en"


class ExportRead(BaseModel):
    export_url: str
    aspect_ratio: str = "9:16"
