from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Project, Template, Video
from ..schemas import CaptionRequest, ExportRead, MusicUpdate, OverlayCreate, ProjectCreate, ProjectRead, TrimUpdate, VideoCreate, VideoRead

router = APIRouter(prefix="/api", tags=["clipcraft"])


@router.get("/health")
def health():
    return {"status": "ok", "service": "clipcraft-api"}


@router.post("/projects", response_model=ProjectRead, status_code=status.HTTP_201_CREATED)
def create_project(payload: ProjectCreate, db: Session = Depends(get_db)):
    project = Project(user_id=payload.user_id, title=payload.title, status="draft", aspect_ratio="9:16")
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.get("/projects", response_model=list[ProjectRead])
def list_projects(user_id: int | None = None, db: Session = Depends(get_db)):
    query = db.query(Project).order_by(Project.created_at.desc())
    if user_id is not None:
        query = query.filter(Project.user_id == user_id)
    return query.all()


@router.get("/projects/{project_id}", response_model=ProjectRead)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("/videos", response_model=VideoRead, status_code=status.HTTP_201_CREATED)
def upload_video(payload: VideoCreate, db: Session = Depends(get_db)):
    project = db.get(Project, payload.project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if payload.trim_end is not None and payload.trim_end <= payload.trim_start:
        raise HTTPException(status_code=400, detail="trim_end must be greater than trim_start")
    video = Video(project_id=payload.project_id, source_url=payload.source_url, trim_start=payload.trim_start, trim_end=payload.trim_end)
    db.add(video)
    db.commit()
    db.refresh(video)
    return video


@router.get("/videos/{video_id}", response_model=VideoRead)
def get_video(video_id: int, db: Session = Depends(get_db)):
    video = db.get(Video, video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    return video


@router.patch("/videos/{video_id}/trim", response_model=VideoRead)
def trim_video(video_id: int, payload: TrimUpdate, db: Session = Depends(get_db)):
    video = db.get(Video, video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    if payload.trim_end <= payload.trim_start:
        raise HTTPException(status_code=400, detail="trim_end must be greater than trim_start")
    video.trim_start = payload.trim_start
    video.trim_end = payload.trim_end
    db.commit()
    db.refresh(video)
    return video


@router.post("/videos/{video_id}/captions", response_model=VideoRead)
def generate_captions(video_id: int, payload: CaptionRequest, db: Session = Depends(get_db)):
    video = db.get(Video, video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    video.captions = [
        {"start": video.trim_start, "end": video.trim_start + 2.4, "text": "Hook your viewer in the first three seconds.", "language": payload.language},
        {"start": video.trim_start + 2.5, "end": video.trim_start + 5.0, "text": "ClipCraft turns raw footage into ready-to-post shorts.", "language": payload.language},
    ]
    db.commit()
    db.refresh(video)
    return video


@router.post("/videos/{video_id}/overlays", response_model=VideoRead)
def add_overlay(video_id: int, payload: OverlayCreate, db: Session = Depends(get_db)):
    video = db.get(Video, video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    if payload.end <= payload.start:
        raise HTTPException(status_code=400, detail="overlay end must be greater than start")
    overlays = list(video.overlays or [])
    overlays.append(payload.model_dump())
    video.overlays = overlays
    db.commit()
    db.refresh(video)
    return video


@router.patch("/videos/{video_id}/music", response_model=VideoRead)
def set_music(video_id: int, payload: MusicUpdate, db: Session = Depends(get_db)):
    video = db.get(Video, video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    video.music_track = payload.track
    db.commit()
    db.refresh(video)
    return video


@router.post("/videos/{video_id}/export", response_model=ExportRead)
def export_video(video_id: int, db: Session = Depends(get_db)):
    video = db.get(Video, video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    video.export_url = f"https://exports.clipcraft.local/videos/{video.id}-9x16.mp4"
    video.project.status = "exported"
    db.commit()
    return ExportRead(export_url=video.export_url)


@router.get("/templates")
def list_templates(db: Session = Depends(get_db)):
    templates = db.query(Template).order_by(Template.name).all()
    if templates:
        return templates
    return [
        {"name": "Bold Hook", "category": "captions", "config": {"font": "Inter Black", "position": "center"}},
        {"name": "Podcast Cutdown", "category": "creator", "config": {"safe_zone": True, "captions": "large"}},
        {"name": "Product Demo", "category": "launch", "config": {"cta": "bottom", "music": "upbeat"}},
    ]
