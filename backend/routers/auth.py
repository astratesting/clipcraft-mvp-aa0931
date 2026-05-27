from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User
from ..schemas import UserCreate, UserLogin, UserRead

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter((User.email == payload.email) | (User.firebase_uid == payload.firebase_uid)).first()
    if existing:
        raise HTTPException(status_code=409, detail="User already exists")
    user = User(firebase_uid=payload.firebase_uid, email=payload.email, display_name=payload.display_name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=UserRead)
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.firebase_uid == payload.firebase_uid).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/me", response_model=UserRead)
def me(firebase_uid: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.firebase_uid == firebase_uid).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
