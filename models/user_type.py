#!/usr/bin/python3
""" user_type Module for Job Bank Holberton """
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey


class UserType(BaseModel, Base):
    """ inherits from BaseModel and Base """
    __tablename__ = "USER_TYPE"
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(55), nullable=False)
    user_id = Column(Integer, ForeignKey("Users.id"), nullable=False)